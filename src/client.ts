import { readdir } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import type { ClientEvents, ClientOptions } from "discord.js";
import { Client, Collection } from "discord.js";
import { logger } from "./function";
import type { CommandOptions, EventOptions } from "./types";

export default class Bot extends Client {
	public commands: Collection<string, CommandOptions> = new Collection();

	public constructor(options: ClientOptions) {
		super(options);
	}

	public async start() {
		this.setMaxListeners(0);
		await Promise.all([this.initCommands(), this.initEvents()]);
		await this.login(process.env.TOKEN);
	}

	private async initCommands() {
		const path = join(__dirname, "..", "commands");
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

	private readonly initEvents = async () => {
		const path = join(__dirname, "..", "events");
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
