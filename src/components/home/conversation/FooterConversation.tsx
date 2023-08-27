import { SendHorizonal, Smile } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useConversationsActions, useKeyAction } from '@/hooks';
import { Conversation, User } from '@/interfaces';

interface Props {
    otherUser: User;
    conversation: Conversation;
}

export const FooterConversation: FC<Props> = ({ conversation, otherUser }) => {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const { handleSendMessage } = useConversationsActions();

    const onChangeMessage = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setMessage(target.value);
    };
    const toggleOpen = () => {
        setOpen(!open);
    };

    const handleEmojiSelect = (emoji: any) => {
        // Aquí actualizamos el estado "message" con el emoji seleccionado
        setMessage((prevMessage) => prevMessage + emoji.native);
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.length <= 0) return;
        handleSendMessage({ content: message, receiver: otherUser._id });
        setMessage('');
    };

    useKeyAction('e', toggleOpen);

    return (
        <footer className='bg-card py-2 pr-[11px] h-[68px]'>
            <div className='flex items-center'>
                {/* OPTIONS */}
                <div className='flex items-center pl-[10px] min-h-[52px]'>
                    <Popover open={open} onOpenChange={toggleOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                size={'icon'}
                                variant={'outline'}
                                onClick={toggleOpen}>
                                <Smile size={22} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[385px] bg-card'>
                            <Picker
                                data={data}
                                onEmojiSelect={handleEmojiSelect}
                                theme={'auto'}
                                searchPosition={'sticky'}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className='flex flex-[1] items-center min-h-[52px] min-w-0'>
                    {/* FORM TEXT MESSAGE */}

                    <form
                        className='ml-[10px] flex-[1_1_auto] flex gap-3'
                        onSubmit={onSubmit}>
                        <Input
                            onChange={onChangeMessage}
                            value={message}
                            type='text'
                            className='w-full py-2 pl-4'
                            placeholder='Escribe un mensaje aquí'
                        />
                        <Button size={'icon'} type='submit'>
                            <SendHorizonal size={20} />
                        </Button>
                    </form>
                </div>
            </div>
        </footer>
    );
};
