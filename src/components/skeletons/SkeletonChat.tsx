import { Skeleton } from '../ui/skeleton';

export const SkeletonChat = () => {
    return (
        <div className='p-0 border rounded-none'>
            <div className='flex items-center w-full relative flex-row h-[72px]'>
                <div className='flex'>
                    <div className='px-4'>
                        <Skeleton className='w-14 h-14 rounded-full' />
                    </div>
                </div>
                <div className='flex-1 flex flex-col justify-center pr-[15px] h-[72px]'>
                    <div>
                        <div className='flex justify-between'>
                            <div className='flex-1 mb-1.5'>
                                <Skeleton className='w-12 h-4' />
                            </div>
                            <div className='text'>
                                <Skeleton className='w-[25px] h-4' />
                            </div>
                        </div>
                        <div className='flex gap-1 items-center justify-start'>
                            <div className='flex-1'>
                                <Skeleton className='h-5 w-36' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
