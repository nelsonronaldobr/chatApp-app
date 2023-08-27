import { Moon, Palette, Sun, X } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger
} from '@/components/ui/context-menu';
import { MessageReceiver, MessageSender } from '../messages';
import { Link } from 'react-router-dom';
import { Message, User } from '@/interfaces';
import { FC, useRef, useEffect } from 'react';
import { useAuthStore } from '@/hooks';

interface Props {
    messages: Message[];
    otherUser: User;
}

export const MainConversation: FC<Props> = ({ messages, otherUser }) => {
    const { user } = useAuthStore();
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            });
        }
    }, [messages]);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <ScrollArea className='h-[calc(100vh_-_126px)] w-full bg-background'>
                    <div>
                        <div className='min-h-[16px]'></div>
                        <div
                            className='flex-[0_0_auto] pb-4 flex flex-col gap-4'
                            ref={messageRef}>
                            {messages.length === 0 ? (
                                <p className='text-muted-foreground text-center mt-10'>
                                    Aun no tienes ninguna mensaje.
                                </p>
                            ) : (
                                messages.map((message) => {
                                    if (user!._id === message.sender._id) {
                                        return (
                                            <MessageSender
                                                message={message}
                                                key={message._id}
                                            />
                                        );
                                    } else {
                                        return (
                                            <MessageReceiver
                                                key={message._id}
                                                message={message}
                                            />
                                        );
                                    }
                                })
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </ContextMenuTrigger>
            <ContextMenuContent className='w-56'>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <Palette className='h-4 w-4 mr-2' />
                        <span>Cambiar tema</span>
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className='w-48'>
                        <ContextMenuItem>
                            <Sun className='h-4 w-4 mr-2' />
                            <span>Light</span>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Moon className='h-4 w-4 mr-2' />
                            <span>Dark</span>
                        </ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuItem>
                    <Link to={'/conversations'} className='flex w-full'>
                        <X className='mr-2 h-4 w-4' />
                        <span>Cerrar chat</span>
                    </Link>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
