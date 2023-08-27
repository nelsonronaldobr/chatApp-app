import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <main className='container relative min-h-screen items-center justify-center grid lg:max-w-none'>
            <Outlet />
        </main>
    );
};
