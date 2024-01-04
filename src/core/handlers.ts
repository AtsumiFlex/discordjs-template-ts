import Bot from "./client";
import { join } from "path";
import { existsSync, readdirSync } from "node:fs";
import { mkdirSync } from "fs";
import { CommandOptions, EventOptions } from "../types";
import { ClientEvents } from "discord.js";

export default class Handlers {
	private readonly client: Bot;

	public constructor(client: Bot) {
		this.client = client;
	}

	public async init() {
		await this.initCommands();
		await this.initEvents();
	}

	private async initCommands() {
		const path = join(__dirname, "..", "commands");
		if (!existsSync(path)) mkdirSync(path);
		const folders = readdirSync(path);
		for (const folder of folders) {
			const files = readdirSync(join(path, folder)).filter(file => file.endsWith(".js") || file.endsWith(".ts"));
			for (const file of files) {
				const command: CommandOptions = (await import(join(path, folder, file))).default;
				this.client.commands.set(command.data.name, command);
				console.log(`Loaded command ${command.data.name}`);
			}
		}
	}

	private async initEvents() {
		const path = join(__dirname, "..", "events");
		if (!existsSync(path)) mkdirSync(path);
		const folders = readdirSync(path);
		for (const folder of folders) {
			const files = readdirSync(join(path, folder)).filter(file => file.endsWith(".js") || file.endsWith(".ts"));
			for (const file of files) {
				const event: EventOptions<keyof ClientEvents> = (await import(join(path, folder, file))).default;
				if (event.once) this.client.once(event.event, (...args) => event.listener(this.client, ...args));
				else this.client.on(event.event, (...args) => event.listener(this.client, ...args));
				console.log(`Loaded event ${event.event}`);
			}
		}
	}
}