import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from '@/components/ui/context-menu';
import { formatTimestamp } from '@/helpers';
import { Message } from '@/interfaces';
import { Copy } from 'lucide-react';
import { FC } from 'react';

interface Props {
    message: Message;
}

export const MessageReceiver: FC<Props> = ({ message }) => {
    return (
        <div className='pr-[19px] pl-[25px] md:pr-[19px] md:pl-[25px] flex items-start flex-col'>
            <div className='max-w-[95%] bg-secondary lg:max-w-[85%] xl:max-w-[65%] rounded-md p-[6px_7px_8px_9px]'>
                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-1 flex-grow flex-col justify-center items-center w-[fit-content] h-[fit-content] break-all'>
                                <span className='text-[15px] block'>
                                    {message.content}
                                </span>
                            </div>
                            <div className='w-14 flex justify-end items-end'>
                                <p className='text-[11px] dark:text-[#ffffff99] -mb-[3px]'>
                                    {formatTimestamp(message.createdAt)}
                                </p>
                            </div>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className='w-44'>
                        <ContextMenuItem>
                            <Copy className='h-4 w-4 mr-2' />
                            Copy to Clipboard
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
        </div>
    );
};
