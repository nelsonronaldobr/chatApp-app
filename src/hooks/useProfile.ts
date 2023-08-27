import {
    useGetProfileByIdQuery,
    useUpdateProfileByIdMutation
} from '@/store/apis';
import { useAuthStore } from '.';
import { ErrorResponse } from '@/interfaces';
import { toast } from '@/components/ui/use-toast';

export const useGetProfileById = ({ userId }: { userId: string }) => {
    const { data, ...rest } = useGetProfileByIdQuery({ userId });

    return { ...rest, data: data?.data };
};

export const useProfileMutations = () => {
    const { user } = useAuthStore();

    const [update, { isLoading: isLoadingUpdate }] =
        useUpdateProfileByIdMutation();

    const startUpdateProfile = async (profile: {
        email: string;
        bio: string;
        name: string;
        username: string;
    }) => {
        try {
            const data = await update({
                userId: user!._id,
                profile
            }).unwrap();
            toast({
                description: data.messages?.msg
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
        startUpdateProfile,
        isLoadingUpdate
    };
};
