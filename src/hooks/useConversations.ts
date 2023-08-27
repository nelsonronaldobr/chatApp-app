import { getSocket } from '@/helpers';
import {
    useCreateSendStartMessageMutation,
    useGetConversationByIdQuery,
    useGetConversationsLastMessageQuery
} from '@/store/apis';
import { useAuthStore } from '.';

const socket = getSocket();
export const useGetConversationsLastMessage = () => {
    const query = useGetConversationsLastMessageQuery();
    return {
        ...query
    };
};

export const useGetConversationById = (conversationId: string) => {
    const query = useGetConversationByIdQuery({ conversationId });
    return {
        ...query
    };
};

export const useConversationsActions = () => {
    const { user } = useAuthStore();

    const [create, { isLoading: isLoadingCreate }] =
        useCreateSendStartMessageMutation();

    const handleSendStartMessage = async ({
        receiver
    }: {
        receiver: string;
    }) => {
        // Emitir el mensaje a la sala de la conversación
        try {
            const {
                data: { conversation }
            } = await create({
                receiverId: receiver
            }).unwrap();

            socket.emit('sendStartConversation', {
                conversation,
                receiver
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendMessage = ({
        receiver,
        content
    }: {
        receiver: string;
        content: string;
    }) => {
        socket.emit('sendMessage', { sender: user!._id, receiver, content });
    };

    return {
        handleSendStartMessage,
        handleSendMessage,
        isLoadingCreate
    };
};

/* const handleSendStartMessage = async ({
    receiver
}: {
    receiver: string;
}) => {
    // Emitir el mensaje a la sala de la conversación
    try {
        const {
            data: { conversation }
        } = await create({
            receiverId: receiver
        }).unwrap();
        socket.emit('sendStartConversation', {
            conversation,
            receiver
        });
    } catch (error) {
        console.log(error);
    }
}; */
