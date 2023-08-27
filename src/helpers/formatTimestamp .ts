export const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const currentDate = new Date();

    const addZero = (num: number): string =>
        num < 10 ? `0${num}` : num.toString();
    const getAmPm = (hours: number): string => (hours >= 12 ? 'p.m.' : 'a.m.');

    if (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    ) {
        return `${addZero(date.getHours() % 12 || 12)}:${addZero(
            date.getMinutes()
        )} ${getAmPm(date.getHours())}`;
    } else {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
};
