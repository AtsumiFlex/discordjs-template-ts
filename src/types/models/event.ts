import type { Awaitable, ClientEvents } from "discord.js";
import type Bot from "../../client";

export type EventOptions<K extends keyof ClientEvents> = {
	event: K;
	listener(client: Bot, ...args: ClientEvents[K]): Awaitable<void>;
	once?: boolean;
};
