import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation, Message, User } from '@/interfaces';
import { useAuthStore } from '@/hooks';
import { formatTimestamp } from '@/helpers';
import { Link } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

interface Props {
    conversation: Conversation;
}

interface Props {
    conversation: Conversation;
}

const MessageContent: FC<{ message: Message; currentUser: User | null }> = ({
    message,
    currentUser
}) => {
    const isCurrentUser = currentUser?._id === message.sender._id;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className='text-sm flex-1 flex gap-1'>
                        {isCurrentUser ? <span>Tu:</span> : ''}
                        <p className='text-ellipsis overflow-hidden whitespace-nowrap w-44 md:w-56'>
                            {message.content}
                        </p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className='w-64 break-all'>{message.content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const Chat: FC<Props> = ({ conversation }) => {
    const { user } = useAuthStore();
    const { lastMessage, participants } = conversation;
    const otherUser = participants.find(
        (participant) => participant._id !== user?._id
    );
    return (
        <Link to={`/conversations/${conversation._id}`}>
            <Button
                variant={'outline'}
                asChild
                className='p-0 cursor-pointer rounded-none'>
                <div className='flex items-center w-full relative flex-row h-[72px]'>
                    <div className='flex'>
                        <div className='flex px-4 items-center'>
                            <Avatar className='flex items-center'>
                                <AvatarImage
                                    src={`${otherUser?.avatar}`}
                                    alt='@shadcn'
                                    className='w-14 h-14 object-cover rounded-full'
                                />
                                <AvatarFallback className='w-14 h-14 object-cover rounded-full'>
                                    CN
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col justify-center pr-[15px] h-[72px]'>
                        <div>
                            <div className='flex justify-between'>
                                <span className='text-base font-semibold flex-1'>
                                    {otherUser?.name}
                                </span>
                                <div className='dark:text-[#D1D1DB]'>
                                    <span className='text-xs'>
                                        {formatTimestamp(lastMessage.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <div className='flex gap-1 items-center justify-start'>
                                <MessageContent
                                    message={lastMessage}
                                    currentUser={user as User}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Button>
        </Link>
    );
};
