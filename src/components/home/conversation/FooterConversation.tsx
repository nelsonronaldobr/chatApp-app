import { Loader2Icon, SendHorizonal, Smile } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import {
    ChangeEvent,
    FC,
    FormEvent,
    useCallback,
    useEffect,
    useState
} from 'react';
import { useConversationsActions, useKeyAction } from '@/hooks';
import { Conversation, User } from '@/interfaces';
import { getSocket } from '@/helpers';

interface Props {
    otherUser: User;
    conversation: Conversation;
}

const socket = getSocket();

export const FooterConversation: FC<Props> = ({ otherUser }) => {
    const [message, setMessage] = useState('');
    const { handleSendMessage } = useConversationsActions();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const toggleEmojiPicker = () => {
        setIsEmojiPickerOpen(!isEmojiPickerOpen);
    };

    const handleEmojiSelect = useCallback((emoji: any) => {
        setMessage((prevMessage) => prevMessage + emoji.native);
    }, []);

    const onChangeMessage = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setMessage(event.target.value);
        },
        []
    );

    const onSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (message.length > 0) {
                setIsLoading(true);
                handleSendMessage({
                    content: message,
                    receiver: otherUser._id
                });
                setMessage('');
            }
        },
        [message, handleSendMessage, otherUser._id]
    );

    useKeyAction('e', toggleEmojiPicker);

    useEffect(() => {
        // Escuchar el evento de respuesta del servidor
        socket.on('sendMessageResponse', () => {
            setIsLoading(false);
        });
    }, []);

    return (
        <footer className='bg-card py-2 pr-[11px] h-[68px]'>
            <div className='flex items-center'>
                {/* OPTIONS */}
                <div className='flex items-center pl-[10px] min-h-[52px]'>
                    <Popover
                        open={isEmojiPickerOpen}
                        onOpenChange={toggleEmojiPicker}>
                        <PopoverTrigger asChild>
                            <Button
                                size={'icon'}
                                variant={'outline'}
                                onClick={toggleEmojiPicker}>
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
                        <Button
                            size={'icon'}
                            type='submit'
                            disabled={isLoading}>
                            {isLoading ? (
                                <Loader2Icon
                                    size={20}
                                    className='animate-spin'
                                />
                            ) : (
                                <SendHorizonal size={20} />
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </footer>
    );
};
