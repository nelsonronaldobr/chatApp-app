import { getEnvVariables, getSocket, invalidateOn } from '@/helpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import {
    Conversation,
    GetConversation,
    GetConversationsLastMessage,
    Message
} from '@/interfaces';

const { VITE_API_URL } = getEnvVariables();

export const conversationApi = createApi({
    reducerPath: 'conversationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.tokenSession;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Conversations'],
    endpoints: (builder) => ({
        getConversationsLastMessage: builder.query<
            GetConversationsLastMessage,
            void
        >({
            query: () => ({
                url: `/conversation/lastMessage`
            }),
            providesTags: ['Conversations'],
            async onCacheEntryAdded(
                // @ts-expect-error: 'params' is declared but its value is never read.
                params,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
            ) {
                try {
                    await cacheDataLoaded;

                    const socket = getSocket();

                    socket.on(
                        'newMessage',
                        ({
                            newMessage,
                            newConversation
                        }: {
                            newMessage: Message;
                            newConversation: Conversation;
                        }) => {
                            updateCachedData((draft) => {
                                const conversations = draft.data.conversations;

                                if (newConversation == undefined) {
                                    // Si newConversation está vacío, actualiza el lastMessage en la conversación existente
                                    const existingConversationIndex =
                                        conversations.findIndex(
                                            (conversation) =>
                                                conversation._id ===
                                                newMessage.conversation
                                        );

                                    if (existingConversationIndex !== -1) {
                                        const existingConversation =
                                            conversations[
                                                existingConversationIndex
                                            ];
                                        existingConversation.lastMessage =
                                            newMessage;
                                    }
                                } else {
                                    // Si newConversation tiene contenido, agrégalo a las conversaciones
                                    conversations.unshift(newConversation);
                                }

                                // Ordenar las conversaciones por fecha de creación del último mensaje (más reciente primero)
                                conversations.sort(
                                    (a, b) =>
                                        new Date(
                                            b.lastMessage.createdAt
                                        ).getTime() -
                                        new Date(
                                            a.lastMessage.createdAt
                                        ).getTime()
                                );
                            });
                        }
                    );

                    await cacheEntryRemoved;
                } catch (error) {}
            }
        }),
        getConversationById: builder.query<
            GetConversation,
            { conversationId: string }
        >({
            query: ({ conversationId }) => ({
                url: `/conversation/${conversationId}`
            }),
            providesTags: ['Conversations'],
            async onCacheEntryAdded(
                params,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
            ) {
                try {
                    await cacheDataLoaded;

                    const socket = getSocket();

                    socket.on(
                        'newMessage',
                        ({ newMessage }: { newMessage: Message }) => {
                            if (
                                params.conversationId ===
                                newMessage.conversation
                            ) {
                                updateCachedData((draft) => {
                                    const conversation =
                                        draft.data.conversation;

                                    // Agregar el nuevo mensaje al array de mensajes
                                    conversation.messages.push(newMessage);

                                    // Ordenar los mensajes por fecha de creación
                                    conversation.messages.sort(
                                        (a, b) =>
                                            new Date(a.createdAt).getTime() -
                                            new Date(b.createdAt).getTime()
                                    );
                                });
                            }
                        }
                    );

                    await cacheEntryRemoved;
                } catch (error) {}
            }
        }),
        createSendStartMessage: builder.mutation<
            GetConversation,
            { receiverId: string }
        >({
            query: ({ receiverId }) => ({
                url: '/conversation',
                method: 'POST',
                body: { receiverId }
            }),
            invalidatesTags: invalidateOn({
                success: ['Conversations' as const]
            })
        })
    })
});

export const {
    useGetConversationsLastMessageQuery,
    useGetConversationByIdQuery,
    useCreateSendStartMessageMutation
} = conversationApi;
