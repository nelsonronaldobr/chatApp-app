import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@/components/ui/hover-card';
import { CalendarIcon } from 'lucide-react';
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
import { FriendRequestStatus, User } from '@/interfaces';
import { Badge } from '@/components/ui/badge';

interface Props {
    receiver: User;
    status: FriendRequestStatus;
}

export const FriendItemSent: FC<Props> = ({ receiver, status }) => {
    return (
        <Card className='py-2 px-3 bg-background border-0 hover:bg-card transition-colors'>
            <CardContent className='p-0 flex'>
                <div className='flex flex-grow items-center'>
                    <Avatar>
                        <AvatarImage
                            src={`${receiver.avatar}`}
                            alt={`${receiver.username}`}
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
                                    {receiver.name}
                                </Button>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className='w-80'>
                            <div className='flex justify-between space-x-4'>
                                <Avatar>
                                    <AvatarImage
                                        src={`${receiver.avatar}`}
                                        alt={`${receiver.username}`}
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                    <AvatarFallback>VC</AvatarFallback>
                                </Avatar>
                                <div className='space-y-1'>
                                    <h4 className='text-sm font-semibold'>
                                        {receiver.email}
                                    </h4>
                                    <p className='text-sm'>
                                        {receiver.bio
                                            ? receiver.bio
                                            : 'The React Framework – created and maintained by @vercel.'}
                                    </p>
                                    <div className='flex items-center pt-2'>
                                        <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                                        <span className='text-xs text-muted-foreground'>
                                            {convertDate(receiver.createdAt)}
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
                                <span className='cursor-pointer'>
                                    <Badge
                                        variant='destructive'
                                        className='capitalize'>
                                        {status}
                                    </Badge>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Estatus de la solicitud</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );
};
