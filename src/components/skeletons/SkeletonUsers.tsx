import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}
export const SkeletonUsers: FC<Props> = ({ children }) => {
    return <ul className='flex flex-col gap-2'>{children}</ul>;
};
