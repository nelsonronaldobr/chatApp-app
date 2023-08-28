import { SearchSidebar } from './SearchSidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    CalendarIcon,
    Cog,
    Loader2,
    LogOut,
    MailPlus,
    MoreVertical,
    User,
    UserPlus2,
    Users
} from 'lucide-react';
import {
    useAuthStore,
    useConversationsActions,
    useGetFriends,
    useGetProfileById,
    useKeyAction
} from '@/hooks';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { convertDate, getSocket } from '@/helpers';
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from '@/components/ui/tooltip';
const socket = getSocket();

export const HeaderSidebar = () => {
    const [open, setOpen] = useState(false);
    const { logout, user } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const { data: dataProfile, isLoading: isLoadingProfile } =
        useGetProfileById({
            userId: user!._id
        });

    const { data: dataFriends, isLoading: isLoadingFriends } = useGetFriends();
    const toggleOpen = () => {
        setOpen(!open);
    };

    const { handleSendStartMessage } = useConversationsActions();
    const onLogout = () => {
        logout();
    };

    const onClick = (receiver: string) => {
        setIsLoading(true);
        handleSendStartMessage({
            receiver
        });
    };

    useKeyAction('f', toggleOpen);
    useKeyAction('q', onLogout);

    useEffect(() => {
        // Escuchar el evento de respuesta del servidor
        socket.on('startConversationResponse', () => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div className='flex flex-col'>
            <div className='bg-card flex justify-between items-center px-4 py-[9px]'>
                {/* IMG PROFILE */}

                {isLoadingProfile ? (
                    <div></div>
                ) : (
                    <div className='cursor-pointer'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar>
                                    <AvatarImage
                                        src={`${dataProfile?.profile.avatar}`}
                                        alt={`${dataProfile?.profile.username}`}
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                    <AvatarFallback asChild>
                                        <Skeleton className='w-10 h-10 rounded-full' />
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent side='right'>
                                <div className='flex gap-2 flex-col'>
                                    <div className='flex justify-between space-x-4'>
                                        <Avatar>
                                            <AvatarImage
                                                src={`${dataProfile?.profile.avatar}`}
                                                alt={`${dataProfile?.profile.username}`}
                                                className='w-10 h-10 object-cover rounded-full'
                                            />
                                            <AvatarFallback asChild>
                                                <Skeleton className='w-10 h-10 rounded-full' />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='space-y-1'>
                                            <h4 className='text-sm font-semibold'>
                                                {dataProfile!.profile.email}
                                            </h4>
                                            <p className='text-sm break-all'>
                                                {dataProfile?.profile.bio}
                                            </p>
                                            <div className='flex items-center pt-2'>
                                                <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                                                <span className='text-xs text-muted-foreground'>
                                                    {convertDate(
                                                        dataProfile!.profile
                                                            .createdAt
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button asChild size={'sm'}>
                                        <Link to={'/settings'}>
                                            Actualizar Perfil
                                        </Link>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}

                <CommandDialog open={open} onOpenChange={toggleOpen}>
                    <CommandInput placeholder='Busca un amigo.....' />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading='Amigos'>
                            {isLoadingFriends ? (
                                <Loader2 className='animate-spin' size={30} />
                            ) : (
                                dataFriends?.data.friends.map(({ friend }) => (
                                    <CommandItem key={friend._id}>
                                        <User className='mr-2 h-4 w-4' />
                                        <span>{friend.name}</span>
                                        <CommandShortcut>
                                            <Button
                                                disabled={isLoading}
                                                size={'sm'}
                                                onClick={() =>
                                                    onClick(friend._id)
                                                }>
                                                <span>Saludar</span>
                                            </Button>
                                        </CommandShortcut>
                                    </CommandItem>
                                ))
                            )}
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>

                {/* ICONS */}
                <div className='flex ml-[10px]'>
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={'ghost'}
                                    size={'icon'}
                                    className='rounded-xl'
                                    onClick={toggleOpen}>
                                    <MailPlus size={23} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Nuevo Mensaje</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {/* MODAL SIDEBAR */}
                    <div className='ml-[10px]'>
                        <TooltipProvider>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={'ghost'}
                                        size={'icon'}
                                        className='rounded-xl'
                                        asChild>
                                        <Link to={'/friends/search'}>
                                            <UserPlus2 size={23} />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Agregar Amigos</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className='cursor-pointer ml-[10px]'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={'ghost'}
                                    size={'icon'}
                                    className='rounded-xl'>
                                    <MoreVertical size={23} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56'>
                                <DropdownMenuItem asChild>
                                    <Link to={`/friends/@`}>
                                        <Users className='mr-2 h-4 w-4' />
                                        <span>Amigos</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to={`/settings/profile`}>
                                        <Cog className='mr-2 h-4 w-4' />
                                        <span>Preferencias y privacidad</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={onLogout}>
                                    <LogOut className='mr-2 h-4 w-4' />
                                    <span>Cerrar Sesión</span>
                                    <DropdownMenuShortcut>
                                        ⌘Q
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {/* SEPARATOR */}
            <Separator />
            {/* SEARCH SIDEBAR */}
            <SearchSidebar />
        </div>
    );
};
