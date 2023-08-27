import { User } from '@/interfaces';
import { FC } from 'react';
import { FriendSearchItem } from '.';

interface Props {
    users: User[];
}

export const FriendsSearchResult: FC<Props> = ({ users }) => {
    return (
        <ul className='flex flex-col gap-2'>
            {users.length === 0 ? (
                <></>
            ) : (
                users.map((user) => (
                    <li key={user._id}>
                        <FriendSearchItem user={user} />
                    </li>
                ))
            )}
        </ul>
    );
};
