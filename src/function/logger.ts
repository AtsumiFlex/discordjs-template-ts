import chalk from "chalk";

export const logger = new class Logger {
	public generateTimestamp = () => {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const milliseconds = date.getMilliseconds();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `[${day}/${month}/${year} ${hours}:${minutes}:${seconds}:${milliseconds}]`;
	};

	public createLogger = (color: chalk.ChalkFunction, ...args: any[]) => {
		return console.log(color(this.generateTimestamp(), ...args));
	};

	public info = (...args: any[]) => {
		return this.createLogger(chalk.bold.blue, ...args);
	};

	public warn = (...args: any[]) => {
		return this.createLogger(chalk.bold.yellow, ...args);
	};

	public error = (...args: any[]) => {
		return this.createLogger(chalk.bold.red, ...args);
	};

	public success = (...args: any[]) => {
		return this.createLogger(chalk.bold.green, ...args);
	};

	public debug = (...args: any[]) => {
		return this.createLogger(chalk.bold.magenta, ...args);
	};

	public log = (...args: any[]) => {
		return this.createLogger(chalk.bold.white, ...args);
	};

	public trace = (...args: any[]) => {
		return this.createLogger(chalk.bold.cyan, ...args);
	};
};