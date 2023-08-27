import { SimpleErrorResponse } from '@/interfaces';
import { useLazyGetSearchUserByNameQuery } from '@/store/apis';

export const useSearchUsers = () => {
    const [trigger, rest] = useLazyGetSearchUserByNameQuery();

    const onSearch = (_search: string) => {
        trigger({ _search });
    };

    const error = rest.error as SimpleErrorResponse;

    return { ...rest, onSearch, error };
};
