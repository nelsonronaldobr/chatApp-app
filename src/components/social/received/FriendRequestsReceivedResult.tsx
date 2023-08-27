import { FriendRequest } from '@/interfaces';
import { FC } from 'react';
import { FriendItemReceived } from '.';

interface Props {
    data: FriendRequest[];
}
export const FriendRequestsReceivedResult: FC<Props> = ({ data }) => {
    return (
        <ul className='flex flex-col gap-2'>
            {data.length === 0 ? (
                <p className='text-muted-foreground text-center'>
                    No cuentas con solicitudes de amistad.
                </p>
            ) : (
                data.map((received) => (
                    <li key={received.sender._id}>
                        <FriendItemReceived
                            sender={received.sender}
                            requestId={received._id}
                        />
                    </li>
                ))
            )}
        </ul>
    );
};
