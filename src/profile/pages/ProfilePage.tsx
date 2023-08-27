import { ProfileForm } from '@/components/profile/form';
import { SkeletonSettings } from '@/components/skeletons';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Separator } from '@/components/ui/separator';
import { useAuthStore, useGetProfileById } from '@/hooks';
import { Navigate } from 'react-router-dom';

export const ProfilePage = () => {
    const { user } = useAuthStore();
    const { data, isLoading, isError } = useGetProfileById({
        userId: user!._id
    });

    if (isError) {
        return <Navigate to={'/settings'} />;
    }

    return (
        <>
            {isLoading ? (
                <SkeletonSettings />
            ) : (
                <ScrollArea className='lg:h-[88%] md:h-[60%]'>
                    <div className='flex flex-col'>
                        <div className='px-6'>
                            <h3 className='text-lg text-secondary-foreground font-semibold'>
                                Perfil
                            </h3>
                            <p className='text-muted-foreground text-sm'>
                                Así es como otros te verán en el sitio.
                            </p>
                            <Separator className='mt-4' />
                        </div>

                        <ProfileForm profile={data!.profile} />
                    </div>
                </ScrollArea>
            )}
        </>
    );
};
