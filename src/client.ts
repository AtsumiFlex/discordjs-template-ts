import { readdir } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import type { ClientEvents, ClientOptions } from "discord.js";
import { Client, Collection } from "discord.js";
import { logger } from "./function";
import type { CommandOptions, EventOptions } from "./types";

/**
 * Represents a Bot that extends the Client class.
 */
export default class Bot extends Client {
	/**
	 * Collection of commands with their corresponding options.
	 */
	public commands: Collection<string, CommandOptions> = new Collection();

	/**
	 * Creates a new instance of the Client class using the provided options.
	 */
	public constructor(options: ClientOptions) {
		super(options);
	}

	/**
	 * Starts the application by initializing commands and events, and logging in with the provided token.
	 */
	public async start() {
		this.setMaxListeners(0);
		await Promise.all([this.initCommands(), this.initEvents()]);
		await this.login(process.env.TOKEN);
	}

	/**
	 * Initialize commands by reading command files from the given path and loading them into `commands` map.
	 */
	private async initCommands() {
		const path = join(__dirname, "commands");
		const dirs = await readdir(path);

		for (const dir of dirs) {
			const files = await readdir(join(path, dir));
			for (const file of files.filter((file) => file.endsWith(".js") || file.endsWith(".ts"))) {
				const command: CommandOptions = (await import(join(path, dir, file))).default;
				this.commands.set(command.data.name, command);
				logger.info(`Loaded command ${command.data.name}`);
			}
		}
	}

	/**
	 * Initializes events by loading event files from a specified directory and attaching event listeners to corresponding events.
	 */
	private readonly initEvents = async () => {
		const path = join(__dirname, "events");
		const dirs = await readdir(path);

		for (const dir of dirs) {
			const files = await readdir(join(path, dir));
			for (const file of files.filter((file) => file.endsWith(".js") || file.endsWith(".ts"))) {
				const event: EventOptions<keyof ClientEvents> = (await import(join(path, dir, file))).default;
				if (event.once) {
					this.once(event.event, (...args) => event.listener(this, ...args));
				} else {
					this.on(event.event, (...args) => event.listener(this, ...args));
				}

				logger.info(`Loaded event ${event.event}`);
			}
		}
	};
}
