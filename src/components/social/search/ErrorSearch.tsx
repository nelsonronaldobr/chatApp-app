import { FC } from 'react';

interface Props {
    msg: string;
    className?: React.HTMLAttributes<HTMLSpanElement> | string | undefined;
}
export const ErrorSearch: FC<Props> = ({ msg, className }) => {
    return <p className={`py-2 px-3 ${className}`}>{msg}</p>;
};
