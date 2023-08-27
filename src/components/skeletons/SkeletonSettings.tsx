import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '../ui/separator';

export const SkeletonSettings = () => {
    return (
        <>
            <div className='px-6 space-y-2'>
                <Skeleton className='h-7 w-1/5' />
                <Skeleton className='h-5 w-full' />
                <Separator className='mt-4' />
            </div>
            <form className='px-6'>
                <div className='grid grid-cols-2 gap-5'>
                    <div className='grid gap-3 mt-5'>
                        <Skeleton className='h-4 w-20' />
                        <Skeleton className='w-full h-24' />
                        <Skeleton className='h-4 w-80' />
                    </div>
                    <div className='grid gap-3 mt-5'>
                        <Skeleton className='h-4  w-20' />
                        <Skeleton className='w-full h-24' />
                        <Skeleton className='h-4 w-80' />
                    </div>
                </div>
                <div className='grid gap-3 mt-5'>
                    <Skeleton className='h-4  w-20' />
                    <Skeleton className='w-full h-24' />
                    <Skeleton className='h-4 w-80' />
                </div>
                <div className='mt-5 flex justify-end'>
                    <Skeleton className='h-9 w-32' />
                </div>
            </form>
        </>
    );
};
