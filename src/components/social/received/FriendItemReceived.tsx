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
import { User } from '@/interfaces';
import { useFriendMutations } from '@/hooks';

interface Props {
    sender: User;
    requestId: string;
}

export const FriendItemReceived: FC<Props> = ({ sender, requestId }) => {
    const {
        startAcceptedFriendRequest,
        isLoadingAccepted,
        startCancelFriendRequest,
        isLoadingCancel
    } = useFriendMutations();

    const onAcceptedFriendRequest = () => {
        startAcceptedFriendRequest({ requestId });
    };
    const onCancelFriendRequest = () => {
        startCancelFriendRequest({ requestId });
    };

    return (
        <Card className='py-2 px-3 bg-background border-0 hover:bg-card transition-colors'>
            <CardContent className='p-0 flex'>
                <div className='flex flex-grow items-center'>
                    <Avatar>
                        <AvatarImage
                            src={`${sender?.avatar}`}
                            alt={`${sender?.username}`}
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
                                    {sender.name}
                                </Button>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className='w-80'>
                            <div className='flex justify-between space-x-4'>
                                <Avatar>
                                    <AvatarImage
                                        src={`${sender?.avatar}`}
                                        alt={`${sender?.username}`}
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                    <AvatarFallback asChild>
                                        <Skeleton className='w-10 h-10 rounded-full' />
                                    </AvatarFallback>
                                </Avatar>
                                <div className='space-y-1'>
                                    <h4 className='text-sm font-semibold'>
                                        {sender.email}
                                    </h4>
                                    <p className='text-sm break-all'>
                                        {sender.bio}
                                    </p>
                                    <div className='flex items-center pt-2'>
                                        <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                                        <span className='text-xs text-muted-foreground'>
                                            {convertDate(sender.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>

                <div className='flex items-center gap-2 flex-col lg:flex-row'>
                    <TooltipProvider delayDuration={300}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    disabled={
                                        isLoadingAccepted || isLoadingCancel
                                    }
                                    onClick={onAcceptedFriendRequest}
                                    className='w-32 capitalize'
                                    variant={'default'}>
                                    {isLoadingAccepted || isLoadingCancel ? (
                                        <Loader2
                                            size={20}
                                            className='animate-spin'
                                        />
                                    ) : (
                                        'Confirmar'
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Confirmar solicitud</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={300}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    disabled={
                                        isLoadingAccepted || isLoadingCancel
                                    }
                                    onClick={onCancelFriendRequest}
                                    className='w-32 capitalize'
                                    variant={'default'}>
                                    {isLoadingAccepted || isLoadingCancel ? (
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
                                <p>Eliminar solicitud</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );
};
