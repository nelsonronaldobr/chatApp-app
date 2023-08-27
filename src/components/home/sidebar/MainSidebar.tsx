import { ScrollArea } from '../../ui/scroll-area';
import { useGetConversationsLastMessage } from '@/hooks';
import { SkeletonChat } from '@/components/skeletons';
import { Fragment } from 'react';
import { ChatsResult } from '../conversation';

export const MainSidebar = () => {
    const { data, isLoading } = useGetConversationsLastMessage();
    return (
        <ScrollArea className='h-[83.5vh]'>
            {/* CHATS */}

            {isLoading ? (
                <Fragment>
                    <SkeletonChat />
                    <SkeletonChat />
                    <SkeletonChat />
                    <SkeletonChat />
                </Fragment>
            ) : (
                <ChatsResult conversations={data!.data.conversations} />
            )}
        </ScrollArea>
    );
};
