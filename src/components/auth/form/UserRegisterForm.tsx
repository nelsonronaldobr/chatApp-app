import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

export const UserRegisterForm = () => {
    const { register, isLoading } = useAuthStore();

    const registerSchema = z.object({
        name: z
            .string()
            .min(2, {
                message: 'Ingrese un nombre válido (mínimo 2 caracteres)'
            })
            .max(25, {
                message: 'Ingrese un nombre válido (máximo 25 caracteres)'
            }),
        email: z.string().email({ message: 'Ingrese un correo válido' }),
        password: z.string().min(6, {
            message: 'Ingrese un password válido (mínimo 6 caracteres)'
        })
    });

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register(values);
        form.reset();
    };

    return (
        <div className={'grid gap-6'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid gap-4'>
                        <div className='grid gap-1'>
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className='text-sm'
                                            htmlFor='name'>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <TooltipProvider>
                                                <Tooltip
                                                    open={fieldState.invalid}>
                                                    <TooltipTrigger asChild>
                                                        <Input
                                                            {...field}
                                                            placeholder='Nelson Barrera'
                                                            autoCapitalize='none'
                                                            autoComplete='name'
                                                            id='name'
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
                                name='email'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <FormItem className='relative'>
                                        <FormLabel
                                            className='text-sm'
                                            htmlFor='email'>
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
                                name='password'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <FormItem className='relative'>
                                        <FormLabel
                                            className='text-sm'
                                            htmlFor='password'>
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
                                                            autoCapitalize='none'
                                                            autoComplete='password'
                                                            id='password'
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
                                    'Registrar'
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
