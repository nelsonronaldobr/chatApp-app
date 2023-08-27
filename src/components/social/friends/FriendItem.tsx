import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@/components/ui/hover-card';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from '@/components/ui/tooltip';
import { FC } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { convertDate } from '@/helpers';
import { FriendRequest, User } from '@/interfaces';
import { useFriendMutations } from '@/hooks';

interface Props {
    friend: User;
    friendRequest: FriendRequest;
}

export const FriendItem: FC<Props> = ({ friend, friendRequest }) => {
    const { startDeleteFriend, isLoadingDelete } = useFriendMutations();

    const onDeleteFriend = () => {
        startDeleteFriend({ requestId: friendRequest._id });
    };
    return (
        <Card className='py-2 px-3 bg-background border-0 hover:bg-card transition-colors'>
            <CardContent className='p-0 flex'>
                <div className='flex flex-grow items-center'>
                    <Avatar>
                        <AvatarImage
                            src={`${friend.avatar}`}
                            alt={`${friend.username}`}
                            className='w-10 h-10 object-cover rounded-full'
                        />
                        <AvatarFallback asChild>
                            <Skeleton className='w-10 h-10 rounded-full' />
                        </AvatarFallback>
                    </Avatar>
                    <HoverCard openDelay={300}>
                        <HoverCardTrigger asChild>
                            <div className='flex flex-col justify-center'>
                                <Button
                                    variant={'link'}
                                    className='text-secondary-foreground hover:no-underline'>
                                    {friend.name}
                                </Button>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className='w-80'>
                            <div className='flex justify-between space-x-4'>
                                <Avatar>
                                    <AvatarImage
                                        src={`${friend.avatar}`}
                                        alt={`${friend.username}`}
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                    <AvatarFallback asChild>
                                        <Skeleton className='w-10 h-10 rounded-full' />
                                    </AvatarFallback>
                                </Avatar>
                                <div className='space-y-1'>
                                    <h4 className='text-sm font-semibold'>
                                        {friend.email}
                                    </h4>
                                    <p className='text-sm'>
                                        {friend.bio
                                            ? friend.bio
                                            : 'The React Framework – created and maintained by @vercel.'}
                                    </p>
                                    <div className='flex items-center pt-2'>
                                        <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                                        <span className='text-xs text-muted-foreground'>
                                            {convertDate(friend.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>

                <div className='flex items-center'>
                    <TooltipProvider delayDuration={200}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={onDeleteFriend}
                                    disabled={isLoadingDelete}
                                    className='w-32 capitalize'
                                    variant={'default'}>
                                    {isLoadingDelete ? (
                                        <Loader2
                                            size={20}
                                            className='animate-spin'
                                        />
                                    ) : (
                                        'Eliminar'
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Eliminar amigo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );
};
