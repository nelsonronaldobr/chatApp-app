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
import { User } from '@/interfaces';
import { Skeleton } from '../../ui/skeleton';
import { convertDate } from '@/helpers';
import { useFriendMutations } from '@/hooks';

interface Props {
    user: User;
}

export const FriendSearchItem: FC<Props> = ({ user }) => {
    const {
        startCreate,
        isLoadingCreate,
        startCancelFriendRequest,
        isLoadingCancel,
        startAcceptedFriendRequest,
        isLoadingAccepted
    } = useFriendMutations();

    const onSendRequest = () => {
        startCreate({ receiver: user._id });
    };

    const onCancelFriendRequest = () => {
        if (
            user.friendRequest.exists === false ||
            user.friendRequest.id === null
        ) {
            return;
        }

        startCancelFriendRequest({
            requestId: user.friendRequest.id
        });
    };
    const onAcceptedFriendRequest = () => {
        if (
            user.friendRequest.exists === false ||
            user.friendRequest.id === null
        ) {
            return;
        }
        startAcceptedFriendRequest({ requestId: user.friendRequest.id });
    };

    return (
        <Card className='py-2 px-3 bg-background border-0 hover:bg-card transition-colors'>
            <CardContent className='p-0 flex'>
                <div className='flex flex-grow items-center'>
                    <Avatar>
                        <AvatarImage
                            src={`${user.avatar}`}
                            alt={`${user.username}`}
                            className='w-10 h-10 object-cover rounded-full'
                        />
                        <AvatarFallback asChild>
                            <Skeleton className='w-10 h-10 rounded-full' />
                        </AvatarFallback>
                    </Avatar>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <div className='flex flex-col justify-center'>
                                <Button
                                    variant={'link'}
                                    className='text-secondary-foreground hover:no-underline'>
                                    {user.name}
                                </Button>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className='w-80'>
                            <div className='flex justify-between space-x-4'>
                                <Avatar>
                                    <AvatarImage
                                        src={`${user?.avatar}`}
                                        alt={`${user.username}`}
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                    <AvatarFallback asChild>
                                        <Skeleton className='w-10 h-10 rounded-full' />
                                    </AvatarFallback>
                                </Avatar>
                                <div className='space-y-1'>
                                    <h4 className='text-sm font-semibold'>
                                        {user.email}
                                    </h4>
                                    <p className='text-sm break-all'>
                                        {user.bio}
                                    </p>
                                    <div className='flex items-center pt-2'>
                                        <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                                        <span className='text-xs text-muted-foreground'>
                                            {convertDate(user.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <div>
                    {user.friendRequest.exists &&
                        user.friendRequest.friendRequestStatus === 'sent' && (
                            <TooltipProvider delayDuration={300}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            className='w-32 capitalize'
                                            disabled={isLoadingCancel}
                                            variant={'secondary'}
                                            onClick={onCancelFriendRequest}>
                                            {isLoadingCreate ? (
                                                <Loader2
                                                    size={20}
                                                    className='animate-spin'
                                                />
                                            ) : (
                                                'Cancelar'
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Cancelar solicitud</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}

                    {user.friendRequest.exists &&
                        user.friendRequest.friendRequestStatus ===
                            'received' && (
                            <TooltipProvider delayDuration={300}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            className='w-32 capitalize'
                                            disabled={isLoadingAccepted}
                                            variant={'default'}
                                            onClick={onAcceptedFriendRequest}>
                                            {isLoadingAccepted ? (
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
                        )}
                    {!user.friendRequest.exists && (
                        <TooltipProvider delayDuration={300}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className='w-32 capitalize'
                                        disabled={isLoadingCreate}
                                        variant={'default'}
                                        onClick={onSendRequest}>
                                        {isLoadingCreate ? (
                                            <Loader2
                                                size={20}
                                                className='animate-spin'
                                            />
                                        ) : (
                                            'Agregar'
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Agregar amigo</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
