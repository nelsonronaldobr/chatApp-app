import { getSocket } from '@/helpers';
import { useAuthStore } from '@/hooks';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const socket = getSocket();
export const BaseLayout = () => {
    const { user } = useAuthStore();
    useEffect(() => {
        // Unirse a las salas del usuario al iniciar sesión
        socket.emit('joinRooms', user?._id);
        socket.on(
            'joinConversation',
            ({ conversationId }: { conversationId: string }) => {
                socket.emit('joinRoom', { conversationId });
            }
        );
    }, []);

    return (
        <main className='overflow-hidden'>
            <Outlet />
        </main>
    );
};
