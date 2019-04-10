export const getTime = (dateTime: any) => {
    return `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDate()}  ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
};
