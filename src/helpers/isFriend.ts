import { User } from '@/interfaces';

interface Props {
    userId: string;
    friendsArray: User[];
}

export const isFriend = ({ userId, friendsArray }: Props) => {
    return friendsArray.some((friend) => friend._id === userId);
};
