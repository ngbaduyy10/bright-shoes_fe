import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const dayjsDate = (date) => dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('HH:mm DD-MM-YYYY');

export const dayjsDay = (date) => dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY');

export function convertDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}