import type { Awaitable, ClientEvents } from "discord.js";
import type Bot from "../../client";

/**
 * Represents the options for registering an event listener.
 */
export type EventOptions<K extends keyof ClientEvents> = {
	event: K;
	listener(client: Bot, ...args: ClientEvents[K]): Awaitable<void>;
	once?: boolean;
};
