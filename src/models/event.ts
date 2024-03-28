import type { ClientEvents } from "discord.js";
import type { EventOptions } from "../types";

/**
 * Represents an event that can be listened to.
 */
export class Event<K extends keyof ClientEvents> implements EventOptions<K> {
	public constructor(public event: EventOptions<K>["event"], public listener: EventOptions<K>["listener"], public once?: EventOptions<K>["once"]) {}
}
