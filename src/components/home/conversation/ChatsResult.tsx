import { Conversation } from '@/interfaces';
import { FC } from 'react';
import { Chat } from '.';

interface Props {
    conversations: Conversation[];
}

export const ChatsResult: FC<Props> = ({ conversations }) => {
    return (
        <div>
            {conversations.length === 0 ? (
                <p className='text-muted-foreground text-center mt-10'>
                    Aun no tienes ninguna conversación.
                </p>
            ) : (
                conversations.map((conversation) => (
                    <Chat conversation={conversation} key={conversation._id} />
                ))
            )}
        </div>
    );
};
