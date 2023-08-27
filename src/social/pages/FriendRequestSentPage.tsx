import { SkeletonUser, SkeletonUsers } from '@/components/skeletons';
import { FriendRequestsSentResult } from '@/components/social/sent';
import { Separator } from '@/components/ui/separator';
import { useGetFriendRequestsSent } from '@/hooks';

export const FriendRequestSentPage = () => {
    const { data, isLoading, isFetching } = useGetFriendRequestsSent();

    return (
        <div className='px-6'>
            <h3 className='text-lg text-secondary-foreground font-semibold'>
                Solicitudes de amistad enviadas
            </h3>
            <p className='text-muted-foreground text-sm'>
                Podras ver todas las solicitudes que hayas enviado.
            </p>
            <Separator className='mt-4' />
            <div className='mt-5'>
                {isLoading || isFetching ? (
                    <SkeletonUsers>
                        <SkeletonUser />
                        <SkeletonUser />
                    </SkeletonUsers>
                ) : (
                    <FriendRequestsSentResult
                        data={data?.data.friendRequestsSent || []}
                    />
                )}
            </div>
        </div>
    );
};
