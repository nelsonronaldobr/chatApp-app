import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { UserRegisterForm } from '@/components/auth/form';

export const RegisterPage = () => {
    return (
        <Fragment>
            <Link
                to='/auth/login'
                className={cn(
                    buttonVariants({ variant: 'default' }),
                    'absolute right-4 top-4 md:right-8 md:top-8'
                )}>
                Login
            </Link>

            <div className='p-8 bg-card border shadow-sm'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col space-y-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Registrate
                        </h1>
                    </div>
                    <UserRegisterForm />
                    <p className='px-8 text-center text-sm text-muted-foreground'>
                        Al hacer clic en continuar, aceptas nuestros{' '}
                        <Link
                            to='/terms'
                            className='underline underline-offset-4 hover:text-primary'>
                            Términos de servicio
                        </Link>{' '}
                        and{' '}
                        <Link
                            to='/privacy'
                            className='underline underline-offset-4 hover:text-primary'>
                            Política de privacidad
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </Fragment>
    );
};
