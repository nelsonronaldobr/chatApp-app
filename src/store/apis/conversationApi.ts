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
                params,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
            ) {
                try {
                    await cacheDataLoaded;

                    const socket = getSocket();

                    socket.on(
                        'newConversationNotification',
                        (newConversation: Conversation) => {
                            updateCachedData((draft) => {
                                const conversations = draft.data.conversations;

                                const existingConversationIndex =
                                    conversations.findIndex(
                                        (conversation) =>
                                            conversation._id ===
                                            newConversation._id
                                    );

                                if (existingConversationIndex !== -1) {
                                    // Si ya existe la conversación, actualizamos
                                    conversations[existingConversationIndex] =
                                        newConversation;
                                } else {
                                    // Si no existe, añadimos la nueva conversación
                                    conversations.unshift(newConversation);
                                }
                                // Ordenar las conversaciones por fecha de creación (más reciente primero)
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

                    socket.on(
                        'newMessage',
                        ({
                            newConversation,
                            newMessage
                        }: {
                            newConversation: Conversation;
                            newMessage: Message;
                        }) => {
                            updateCachedData((draft) => {
                                const conversations = draft.data.conversations;

                                const existingConversationIndex =
                                    conversations.findIndex(
                                        (conversation) =>
                                            conversation._id ===
                                            newConversation._id
                                    );

                                if (existingConversationIndex !== -1) {
                                    // Si ya existe la conversación, actualizamos
                                    conversations[existingConversationIndex] =
                                        newConversation;
                                } else {
                                    // Si no existe, añadimos la nueva conversación
                                    conversations.unshift(newConversation);
                                }
                                // Ordenar las conversaciones por fecha de creación (más reciente primero)
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
                        ({
                            newConversation,
                            newMessage
                        }: {
                            newConversation: Conversation;
                            newMessage: Message;
                        }) => {
                            if (
                                params.conversationId ===
                                newMessage.conversation
                            ) {
                                updateCachedData((draft) => {
                                    const messages =
                                        draft.data.conversation.messages;

                                    const existingMessageIndex =
                                        messages.findIndex(
                                            (message) =>
                                                message._id === newMessage._id
                                        );

                                    if (existingMessageIndex !== -1) {
                                        // Si ya existe la conversación, actualizamos
                                        messages[existingMessageIndex] =
                                            newMessage;
                                    } else {
                                        // Si no existe, añadimos la nueva conversación
                                        messages.unshift(newMessage);
                                    }
                                    // Ordenar las conversaciones por fecha de creación (más reciente primero)
                                    // Ordenar las conversaciones por fecha de creación del último mensaje (más reciente primero)
                                    messages.sort(
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
