export const convertDate = (dateISO: string) => {
    const dateObject = new Date(dateISO);

    const monthsInEnglish = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
    ];

    const year = dateObject.getFullYear();
    const month = monthsInEnglish[dateObject.getMonth()];

    return 'Se unió en ' + month + ' ' + year;
};
