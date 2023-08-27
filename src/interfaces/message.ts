import { User } from '.';

export interface Message {
    _id: string;
    conversation: string;
    sender: User;
    receiver: User;
    content: string;
    createdAt: string;
    updatedAt: string;
}
