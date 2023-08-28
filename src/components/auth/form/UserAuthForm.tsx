import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { useAuthStore } from '@/hooks';

export const UserAuthForm = () => {
    const { login, isLoading } = useAuthStore();

    const authSchema = z.object({
        email: z.string().email({ message: 'Ingrese un correo válido' }),
        password: z.string().min(6, {
            message: 'El password debe contener al menos 6 caracteres'
        })
    });

    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (values: z.infer<typeof authSchema>) => {
        login(values);
    };

    return (
        <div className={'grid gap-6'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid gap-4'>
                        <div className='grid gap-1'>
                            <FormField
                                name='email'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <FormItem className='relative'>
                                        <FormLabel
                                            htmlFor='email'
                                            className='text-sm'>
                                            Correo Electrónico
                                        </FormLabel>
                                        <FormControl>
                                            <TooltipProvider>
                                                <Tooltip
                                                    open={fieldState.invalid}>
                                                    <TooltipTrigger asChild>
                                                        <Input
                                                            {...field}
                                                            placeholder='name@example.com'
                                                            type='email'
                                                            id='email'
                                                            autoCapitalize='none'
                                                            autoComplete='email'
                                                            autoCorrect='off'
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <FormMessage className='text-xs' />
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field, fieldState }) => (
                                    <FormItem className='relative'>
                                        <FormLabel
                                            htmlFor='password'
                                            className='text-sm'>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <TooltipProvider>
                                                <Tooltip
                                                    open={fieldState.invalid}>
                                                    <TooltipTrigger asChild>
                                                        <Input
                                                            {...field}
                                                            placeholder='*********'
                                                            type='password'
                                                            id='password'
                                                            autoCapitalize='none'
                                                            autoComplete='password'
                                                            autoCorrect='off'
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <FormMessage className='text-xs' />
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mt-4'>
                            <Button className='w-full' disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
            {/* <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>
                        O continuar con
                    </span>
                </div>
            </div>
            <Button variant='outline' type='button' disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                    <Github className='mr-2 h-4 w-4' />
                )}
                Github
            </Button> */}
        </div>
    );
};
