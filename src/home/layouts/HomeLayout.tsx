import { Sidebar } from '@/components/home/sidebar';
import { Outlet } from 'react-router-dom';

export const HomeLayout = () => {
    return (
        <main className='overflow-hidden min-h-screen flex 2xl:container m-auto min-w-[748px] w-full h-full'>
            {/* SIDEBAR CHATS */}
            <Sidebar />
            {/* CHAT CONVERSATION */}
            <div className='flex flex-grow flex-col bg-cover bg-center bg-no-repeat'>
                <Outlet />
            </div>
        </main>
    );
};
