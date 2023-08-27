import { CalendarIcon, MoreVertical, X } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import { FC, Fragment } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from '../../ui/dropdown-menu';
import { User } from '@/interfaces';
import { convertDate } from '@/helpers';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
    otherUser: User;
}

export const HeaderConversation: FC<Props> = ({ otherUser }) => {
    return (
        <Fragment>
            <div className='bg-card flex h-[58px] justify-between items-center px-4 py-[9px]'>
                {/* USER INFO */}
                <div className='flex flex-1 items-center gap-3'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'link'}
                                className='hover:no-underline text-card p-0 flex gap-4'>
                                <Avatar>
                                    <AvatarImage
                                        src='https://github.com/shadcn.png'
                                        alt='@shadcn'
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                    <AvatarFallback asChild>
                                        <Skeleton className='w-10 h-10 rounded-full' />
                                    </AvatarFallback>
                                </Avatar>
                                <span className='text-base text-black dark:text-[#e9edef] font-medium'>
                                    {otherUser.name}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-80'>
                            <div className='flex justify-between space-x-4'>
                                <Avatar>
                                    <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5y_WJqreAirIdtrQO0LlzIVFhlNVJ95gybg&usqp=CAU' />
                                    <AvatarFallback asChild>
                                        <Skeleton className='w-10 h-10 rounded-full' />
                                    </AvatarFallback>
                                </Avatar>
                                <div className='space-y-1'>
                                    <h4 className='text-sm font-semibold'>
                                        {otherUser.email}
                                    </h4>
                                    <p className='text-sm'>
                                        {otherUser.bio
                                            ? otherUser.bio
                                            : 'The React Framework – created and maintained by @vercel.'}
                                    </p>
                                    <div className='flex items-center pt-2'>
                                        <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                                        <span className='text-xs text-muted-foreground'>
                                            {convertDate(otherUser.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* ICONS */}
                <div className='flex'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={'ghost'}
                                size={'icon'}
                                className='rounded-xl'>
                                <MoreVertical size={23} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-40'>
                            <DropdownMenuItem asChild>
                                <Link
                                    to={'/conversations'}
                                    className='flex w-full'>
                                    <X className='mr-2 h-4 w-4' />
                                    <span>Cerrar chat</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Separator />
        </Fragment>
    );
};
