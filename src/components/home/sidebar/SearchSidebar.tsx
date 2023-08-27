import { Search } from 'lucide-react';
import { Input } from '../../ui/input';

export const SearchSidebar = () => {
    return (
        <div className='p-3 py-2'>
            <form className='relative'>
                <Input
                    type='text'
                    placeholder='Busca un chat o inicia uno nuevo'
                />
                <Search
                    className='absolute top-1/2 -translate-y-1/2 right-4'
                    size={16}
                />
            </form>
        </div>
    );
};
