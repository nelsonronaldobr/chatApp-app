import { Button } from '@/components/ui/button';
import { NavbarLinks } from '@/profile/layouts';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
    links: NavbarLinks[];
}

export const Sidebar: FC<Props> = ({ links }) => {
    const { pathname } = useLocation();

    return (
        <ul className='xl:max-w-[30%] bg-background border rounded-xl pt-6 px-6  xl:flex-[0_0_30%] lg:max-w-[40%] lg:flex-[0_0_40%] flex-[0_0_45%] max-w-[45%]'>
            {links.map(({ Icon, href, title }) => (
                <li key={href}>
                    <Button
                        className={`w-full justify-start text-secondary-foreground ${
                            pathname === href ? 'bg-card' : ''
                        }`}
                        variant={'ghost'}
                        asChild>
                        <div>
                            {Icon}
                            <Link to={href}>{title}</Link>
                        </div>
                    </Button>
                </li>
            ))}
        </ul>
    );
};
