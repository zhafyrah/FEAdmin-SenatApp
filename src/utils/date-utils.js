export function formatDateToServer(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDateTimeFromServer(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(),
        minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return `${[day, month, year ].join('/')} ${[hours, minutes].join(':')}`;
}