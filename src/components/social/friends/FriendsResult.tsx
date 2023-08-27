import { FriendRequest, User } from '@/interfaces';
import { FC } from 'react';
import { FriendItem } from '.';

interface Props {
    data: {
        friend: User;
        friendRequest: FriendRequest;
    }[];
}

export const FriendsResult: FC<Props> = ({ data }) => {
    return (
        <ul className='flex flex-col gap-2'>
            {data.length === 0 ? (
                <p className='text-muted-foreground text-center'>
                    Aun no tienes amigos.
                </p>
            ) : (
                data.map((friendConnection) => (
                    <li key={friendConnection.friendRequest._id}>
                        <FriendItem
                            friend={friendConnection.friend}
                            friendRequest={friendConnection.friendRequest}
                        />
                    </li>
                ))
            )}
        </ul>
    );
};
