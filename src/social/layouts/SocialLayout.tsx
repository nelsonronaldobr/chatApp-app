import { Sidebar } from '@/components/profile/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavbarLinks } from '@/profile/layouts';
import { Heart, Users2, Search, Home } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const sidebarItems: NavbarLinks[] = [
    {
        title: 'Amigos',
        Icon: <Users2 className='mr-2' />,
        href: '/friends/@'
    },
    {
        title: 'Buscar amigos',
        Icon: <Search className='mr-2' />,
        href: '/friends/search'
    },

    {
        title: 'Solicitudes de amistad',
        Icon: <Heart className='mr-2' />,
        href: '/friends/receiveds'
    },
    /* {
        title: 'Solicitudes de amistad enviadas',
        Icon: <SendHorizonal className='mr-2' />,
        href: '/friends/requests'
    }, */
    {
        href: `/home`,
        title: 'Página Principal',
        Icon: <Home className='mr-2' />
    }
];

export const SocialLayout = () => {
    return (
        <div className='flex flex-col px-6 container bg-card'>
            <div className='flex-1 p-6'>
                <h1 className='text-3xl font-bold mb-2 flex items-center gap-1'>
                    <Users2 absoluteStrokeWidth size={35} />
                    <span>Amigos</span>
                </h1>
                <p className='text-muted-foreground text-base'>
                    Administre sus solicitudes enviadas y recibidas, ademas de
                    poder buscar nuevos amigos.
                </p>
            </div>

            <main className='min-h-screen pb-6 flex 2xl:container m-auto min-w-[748px] w-full h-full gap-4'>
                <Sidebar links={sidebarItems} />
                <div className='py-6 border rounded-xl relative flex flex-grow flex-col bg-background'>
                    <ScrollArea className='h-[78%]'>
                        <Outlet />
                    </ScrollArea>
                </div>
            </main>
        </div>
    );
};
