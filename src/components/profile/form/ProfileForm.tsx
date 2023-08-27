import { checkIfUsernameIsValid } from '@/helpers';
import { useProfileMutations } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import slugify from 'slugify';
import { User } from '@/interfaces';
import { FC } from 'react';
import { Loader2 } from 'lucide-react';
interface Props {
    profile: User;
}

export const ProfileForm: FC<Props> = ({ profile }) => {
    const { startUpdateProfile, isLoadingUpdate } = useProfileMutations();

    const profileSchema = z.object({
        email: z.string().email({ message: 'Ingrese un correo válido' }),
        bio: z.string().min(6, {
            message: 'Tu biografia debe contener al menos 6 caracteres'
        }),
        name: z.string().min(3, { message: 'Ingrese un nombre válido' }),
        username: z
            .string()
            .min(3, { message: 'Ingrese un nombre de usario válido' })
            .transform((username) =>
                slugify(username, { strict: true, lower: true })
            )
            .refine(
                async (username) => {
                    return await checkIfUsernameIsValid(username);
                },
                { message: 'EL username se encuentra en uso' }
            )
    });

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: profile.email,
            bio: profile.bio,
            name: profile.name,
            username: profile.username
        }
    });
    const usernameValue = form.watch('username');

    const onSubmit = (values: z.infer<typeof profileSchema>) => {
        startUpdateProfile(values);
    };

    return (
        <Form {...form}>
            <form className='px-6' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 lg:grid-cols-2  gap-5'>
                    <div className='grid gap-3 mt-5 col-span-1'>
                        <FormField
                            name='name'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FormItem className='relative'>
                                    <FormLabel
                                        htmlFor='name'
                                        className='text-sm'>
                                        Nombre
                                    </FormLabel>
                                    <FormControl>
                                        <TooltipProvider>
                                            <Tooltip open={fieldState.invalid}>
                                                <TooltipTrigger asChild>
                                                    <Input
                                                        {...field}
                                                        placeholder='Nelson Barrera'
                                                        className='w-full'
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
                        <span className='text-[12.8px] text-muted-foreground'>
                            Este es el nombre que se mostrará en su perfil y en
                            los correos electrónicos.
                        </span>
                    </div>
                    <div className='grid gap-3 mt-5 col-span-1'>
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='relative'>
                                    <FormLabel
                                        htmlFor='email'
                                        className='text-sm'>
                                        Correo Electrónico
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='w-full'
                                            autoCapitalize='none'
                                            autoComplete='email'
                                            autoCorrect='off'
                                            type='email'
                                            id='email'
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs absolute right-0' />
                                </FormItem>
                            )}
                        />
                        <span className='text-[12.8px] text-muted-foreground'>
                            Este es su correo electornico y no puede ser
                            actualizado por cuestiones de seguridad.
                        </span>
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5'>
                    <div className='grid gap-3 mt-5'>
                        <FormField
                            name='username'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FormItem className='relative'>
                                    <FormLabel
                                        htmlFor='username'
                                        className='text-sm'>
                                        Nombre de Usuario
                                    </FormLabel>
                                    <FormControl>
                                        <TooltipProvider>
                                            <Tooltip open={fieldState.invalid}>
                                                <TooltipTrigger asChild>
                                                    <Input
                                                        {...field}
                                                        placeholder='Nelson Barrera'
                                                        className='w-full'
                                                        autoCapitalize='none'
                                                        autoComplete='username'
                                                        id='username'
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
                        <span className='text-[12.8px] text-muted-foreground'>
                            Este es el nombre de usuario y debe ser unico, no
                            puede repetirse.
                        </span>
                    </div>
                    <div className='grid gap-3 mt-5'>
                        <div className='space-y-1'>
                            <FormLabel
                                htmlFor='username'
                                className='text-sm invisible'>
                                Nombre de Usuario
                            </FormLabel>
                            <Input
                                disabled
                                value={slugify(usernameValue, {
                                    lower: true,
                                    strict: true
                                })}
                            />
                            <span className='text-[12.8px] text-muted-foreground'>
                                Así es como se vera su nombre de usuario.
                            </span>
                        </div>
                    </div>
                </div>
                <div className='grid gap-3 mt-5'>
                    <FormField
                        name='bio'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem className='relative'>
                                <FormLabel htmlFor='bio' className='text-sm'>
                                    Descripción
                                </FormLabel>
                                <FormControl>
                                    <TooltipProvider>
                                        <Tooltip open={fieldState.invalid}>
                                            <TooltipTrigger asChild>
                                                <Textarea
                                                    {...field}
                                                    className='w-full resize-none'
                                                    autoCapitalize='none'
                                                    autoComplete='bio'
                                                    id='bio'
                                                    autoCorrect='off'
                                                    placeholder='description....'
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
                    <p className='text-sm text-muted-foreground'>
                        Esta es tu descripción, puedes escribir cosas sobre ti.
                    </p>
                </div>
                <div className='mt-5 flex justify-end'>
                    <Button
                        variant={'default'}
                        disabled={isLoadingUpdate}
                        className='w-[132px]'>
                        {isLoadingUpdate ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            'Actualizar Perfil'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
