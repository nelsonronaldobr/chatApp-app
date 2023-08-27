import { toast } from '@/components/ui/use-toast';
import { ErrorResponse } from '@/interfaces';
import {
    useAcceptedFriendRequestMutation,
    useCancelFriendRequestMutation,
    useCreateFriendRequestMutation,
    useDeleteFriendMutation,
    useGetFriendRequestsReceivedQuery,
    useGetFriendRequestsSentQuery,
    useGetFriendsQuery,
    useGetSocialUserQuery
} from '@/store/apis';

export const useFriendMutations = () => {
    const [create, { isLoading: isLoadingCreate }] =
        useCreateFriendRequestMutation();

    const startCreate = async ({ receiver }: { receiver: string }) => {
        try {
            const { messages } = await create({ receiver }).unwrap();

            toast({
                description: messages.msg
            });
        } catch (error) {
            const {
                response: { data }
            } = error as ErrorResponse;
            if (data.errors && Object.keys(data.errors).length > 0) {
                return Object.values(data.errors)[0]['msg'];
            }
            toast({
                title: 'Uh oh! Algo salió mal.',
                description: data.messages?.msg
            });
        }
    };
    const [accepted, { isLoading: isLoadingAccepted }] =
        useAcceptedFriendRequestMutation();

    const startAcceptedFriendRequest = async ({
        requestId
    }: {
        requestId: string;
    }) => {
        try {
            const { messages } = await accepted({
                requestId
            }).unwrap();
            toast({
                description: messages?.msg
            });
        } catch (error) {
            const {
                response: { data }
            } = error as ErrorResponse;
            if (data.errors && Object.keys(data.errors).length > 0) {
                return Object.values(data.errors)[0]['msg'];
            }
            toast({
                title: 'Uh oh! Algo salió mal.',
                description: data.messages?.msg
            });
        }
    };

    const [cancel, { isLoading: isLoadingCancel }] =
        useCancelFriendRequestMutation();

    const startCancelFriendRequest = async ({
        requestId
    }: {
        requestId: string;
    }) => {
        try {
            const { messages } = await cancel({
                requestId
            }).unwrap();
            toast({
                description: messages?.msg
            });
        } catch (error) {
            const {
                response: { data }
            } = error as ErrorResponse;
            if (data.errors && Object.keys(data.errors).length > 0) {
                return Object.values(data.errors)[0]['msg'];
            }
            toast({
                title: 'Uh oh! Algo salió mal.',
                description: data.messages?.msg
            });
        }
    };
    const [deleteFriend, { isLoading: isLoadingDelete }] =
        useDeleteFriendMutation();

    const startDeleteFriend = async ({ requestId }: { requestId: string }) => {
        try {
            const { messages } = await deleteFriend({
                requestId
            }).unwrap();
            toast({
                description: messages?.msg
            });
        } catch (error) {
            const {
                response: { data }
            } = error as ErrorResponse;
            if (data.errors && Object.keys(data.errors).length > 0) {
                return Object.values(data.errors)[0]['msg'];
            }
            toast({
                title: 'Uh oh! Algo salió mal.',
                description: data.messages?.msg
            });
        }
    };
    return {
        startCreate,
        isLoadingCreate,
        isLoadingAccepted,
        startAcceptedFriendRequest,
        startCancelFriendRequest,
        isLoadingCancel,
        startDeleteFriend,
        isLoadingDelete
    };
};

export const useGetFriends = () => {
    const query = useGetFriendsQuery();
    return {
        ...query
    };
};

export const useGetFriendRequestsReceived = () => {
    const query = useGetFriendRequestsReceivedQuery();
    return { ...query };
};

export const useGetFriendRequestsSent = () => {
    const query = useGetFriendRequestsSentQuery();
    return { ...query };
};

export const useGetSocialUser = () => {
    const query = useGetSocialUserQuery();
    return { ...query };
};
