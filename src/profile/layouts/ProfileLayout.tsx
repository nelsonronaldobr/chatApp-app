import { Sidebar } from '@/components/profile/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cog, Contact, Home, Settings2, Unlock } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export interface NavbarLinks {
    href: string;
    title: string;
    Icon: JSX.Element;
}

const sidebarItems: NavbarLinks[] = [
    {
        href: `/settings/profile`,
        title: 'Tu información',
        Icon: <Contact className='mr-2' />
    } /* ,
    {
        href: `/settings/account`,
        title: 'Preferencias del sistema',
        Icon: <Settings2 className='mr-2' />
    },
    {
        href: `/home`,
        title: 'Privacidad',
        Icon: <Unlock className='mr-2' />
    } */,
    {
        href: `/home`,
        title: 'Página Principal',
        Icon: <Home className='mr-2' />
    }
];

export const ProfileLayout = () => {
    return (
        <div className='flex flex-col px-6 container bg-card'>
            <div className='flex-1 p-6'>
                <h1 className='text-3xl font-bold mb-2 flex items-center gap-1'>
                    <Cog absoluteStrokeWidth size={35} />
                    <span>Configuración y privacidad</span>
                </h1>
                <p className='text-muted-foreground text-base'>
                    Administre la configuración de su cuenta y establezca las
                    preferencias de correo electrónico.
                </p>
            </div>

            <main className='min-h-screen pb-6 flex 2xl:container m-auto min-w-[748px] w-full h-full gap-4'>
                <Sidebar links={sidebarItems} />
                <div className='pt-6 pb-12 border rounded-xl bg-background w-full'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
