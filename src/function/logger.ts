import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

/**
 * Represents the types of log messages.
 */
const logType = ["info", "error", "debug", "warn"];
/**
 * The logFormat variable represents the format of the log message.
 */
const logFormat = format.combine(
	format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	format.splat(),
	format.colorize(),
	format.errors({ stack: true }),
	format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

/**
 * Represents an array of DailyRotateFile objects used for file rotation transportation.
 */
const filesRotateTransport: DailyRotateFile[] = [];

for (const type of logType) {
	filesRotateTransport.push(new DailyRotateFile({
		filename: `logs/application-%DATE%-${type}.log`,
		datePattern: "YYYY-MM-DD",
		level: type,
		maxSize: "20m",
		maxFiles: "14d",
	}));
}

/**
 * Creates a logger instance with the specified configuration.
 */
export const logger = createLogger({
	level: "debug",
	format: logFormat,
	transports: [new transports.Console({ format: logFormat }), ...filesRotateTransport],
});
