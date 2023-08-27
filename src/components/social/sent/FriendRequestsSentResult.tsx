import { FriendRequest } from '@/interfaces';
import { FC } from 'react';
import { FriendItemSent } from '.';

interface Props {
    data: FriendRequest[];
}
export const FriendRequestsSentResult: FC<Props> = ({ data }) => {
    return (
        <ul className='flex flex-col gap-2'>
            {data.length === 0 ? (
                <></>
            ) : (
                data.map((sent) => (
                    <li key={sent.receiver._id}>
                        <FriendItemSent
                            receiver={sent.receiver}
                            status={sent.status}
                        />
                    </li>
                ))
            )}
        </ul>
    );
};
