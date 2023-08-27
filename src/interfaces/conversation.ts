import { Message, User } from '.';

export interface Conversation {
    _id: string;
    participants: User[];
    messages: Message[];
    lastMessage: Message;
}
