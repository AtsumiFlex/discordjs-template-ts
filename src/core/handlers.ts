import Bot from "./client";
import { join } from "path";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { CommandOptions, EventOptions } from "../types";
import { ClientEvents } from "discord.js";
import { logger } from "../function";

export default class Handlers {
	private readonly client: Bot;

	public constructor(client: Bot) {
		this.client = client;
	}

	public init = async () => {
		await this.initCommands();
		await this.initEvents();
	};

	private initCommands = async () => {
		const path = join(__dirname, "..", "commands");
		if (!existsSync(path)) mkdirSync(path);
		const folders = readdirSync(path);
		for (const folder of folders) {
			const files = readdirSync(join(path, folder)).filter(file => file.endsWith(".js") || file.endsWith(".ts"));
			for (const file of files) {
				const command: CommandOptions = (await import(join(path, folder, file))).default;
				this.client.commands.set(command.data.name, command);
				logger.success(`Loaded command ${command.data.name}`);
			}
		}
	};

	private initEvents = async () => {
		const path = join(__dirname, "..", "events");
		if (!existsSync(path)) mkdirSync(path);
		const folders = readdirSync(path);
		for (const folder of folders) {
			const files = readdirSync(join(path, folder)).filter(file => file.endsWith(".js") || file.endsWith(".ts"));
			for (const file of files) {
				const event: EventOptions<keyof ClientEvents> = (await import(join(path, folder, file))).default;
				if (event.once) this.client.once(event.event, (...args) => event.listener(this.client, ...args));
				else this.client.on(event.event, (...args) => event.listener(this.client, ...args));
				logger.success(`Loaded event ${event.event}`);
			}
		}
	};
}