export const getMonthAndYear = date => {
    const month = new Date(date).toLocaleString('default', { month: 'long' });
    const year = new Date(date).getFullYear();

    return [month, year];
};
