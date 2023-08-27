import { SkeletonUser, SkeletonUsers } from '@/components/skeletons';
import { FriendsResult } from '@/components/social/friends';
import { Separator } from '@/components/ui/separator';
import { useGetFriends } from '@/hooks';

export const FriendsPage = () => {
    const { data, isLoading, isFetching } = useGetFriends();

    return (
        <div className='px-6'>
            <h3 className='text-lg text-secondary-foreground font-semibold'>
                Amigos
            </h3>
            <p className='text-muted-foreground text-sm'>
                Un listado de todos los amigos con los cuales puedes conversar
            </p>
            <Separator className='mt-4' />

            <div className='mt-5'>
                {isLoading || isFetching ? (
                    <SkeletonUsers>
                        <SkeletonUser />
                        <SkeletonUser />
                    </SkeletonUsers>
                ) : (
                    <FriendsResult data={data?.data.friends || []} />
                )}
            </div>
        </div>
    );
};
