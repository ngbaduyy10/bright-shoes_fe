import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const dayjsDate = (date) => dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('HH:mm DD-MM-YYYY');

export const dayjsDay = (date) => dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY');