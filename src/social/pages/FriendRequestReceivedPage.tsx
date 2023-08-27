import { SkeletonUser, SkeletonUsers } from '@/components/skeletons';
import { FriendRequestsReceivedResult } from '@/components/social/received';
import { Separator } from '@/components/ui/separator';
import { useGetFriendRequestsReceived } from '@/hooks';

export const FriendRequestReceivedPage = () => {
    const { data, isLoading, isFetching } = useGetFriendRequestsReceived();

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
                    <FriendRequestsReceivedResult
                        data={data?.data.friendRequestsReceived || []}
                    />
                )}
            </div>
        </div>
    );
};
