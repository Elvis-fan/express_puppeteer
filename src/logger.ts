import { createLogger,format,transports } from "winston";
import { getTime } from "./time";

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message }) => {
    return `[${getTime(new Date())}] ${level}: ${message}`;
});

export let logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'infor.log', level: 'debug' }),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});
