import { SkeletonUser, SkeletonUsers } from '@/components/skeletons';
import { ErrorSearch, FriendsSearchResult } from '@/components/social/search';
import { Input } from '@/components/ui/input';
import { useSearchUsers } from '@/hooks';
import { Separator } from '@radix-ui/react-separator';
import { Loader2, Search } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';

type Timeout = ReturnType<typeof setTimeout>;

export const SearchFriendPage = () => {
    const debounceRef = useRef<Timeout>();

    const { onSearch, data, isLoading, isFetching, isError, error } =
        useSearchUsers();

    const [search, setSearch] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        const { value } = event.target;
        setSearch(value);

        debounceRef.current = setTimeout(() => {
            onSearch(value);
        }, 550);
    };

    return (
        <>
            <div className='px-6'>
                <h3 className='text-lg text-secondary-foreground font-semibold'>
                    Buscar Amigos
                </h3>
                <p className='text-muted-foreground text-sm'>
                    Aquí es como podras encontrar y buscar amigos.
                </p>
                <Separator className='mt-4' />
            </div>
            <form className='px-6'>
                <div className='relative'>
                    <Input
                        type='text'
                        value={search}
                        placeholder='Ingresa un nombre'
                        onChange={onChange}
                    />
                    {isLoading || isFetching ? (
                        <div className='absolute top-1/2 -translate-y-1/2 right-4'>
                            <Loader2 className='animate-spin' size={16} />
                        </div>
                    ) : (
                        <div className='absolute top-1/2 -translate-y-1/2 right-4'>
                            <Search size={16} />
                        </div>
                    )}
                </div>
            </form>
            <div className='px-5 mt-8'>
                {isLoading || isFetching ? (
                    <SkeletonUsers>
                        <SkeletonUser />
                        <SkeletonUser />
                    </SkeletonUsers>
                ) : isError ? (
                    <ErrorSearch
                        msg={error.data.messages.msg}
                        className={'text-center'}
                    />
                ) : (
                    <FriendsSearchResult users={data?.users || []} />
                )}
            </div>
        </>
    );
};
