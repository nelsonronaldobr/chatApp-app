import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonUser = () => {
    return (
        <Card className='py-2 px-3 bg-background border-0 '>
            <CardContent className='p-0 flex justify-between'>
                <div className='flex flex-grow  gap-2 items-center space-x-2'>
                    <Avatar>
                        <Skeleton className='h-10 w-10 rounded-full' />
                    </Avatar>
                    <div className='flex flex-col justify-center'>
                        <Skeleton className='h-4 w-28' />
                    </div>
                </div>
                <div className='flex flex-col justify-center'>
                    <Skeleton className='h-10 w-20 lg:w-32 rounded-md' />
                </div>
            </CardContent>
        </Card>
    );
};
