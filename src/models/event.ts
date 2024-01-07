import { ClientEvents } from "discord.js";
import { EventOptions } from "../types";

export class Event<K extends keyof ClientEvents> implements EventOptions<K> {
	event: EventOptions<K>["event"];
	once?: EventOptions<K>["once"];
	listener: EventOptions<K>["listener"];

	constructor(event: EventOptions<K>["event"], listener: EventOptions<K>["listener"], once?: EventOptions<K>["once"]) {
		this.event = event;
		this.once = once;
		this.listener = listener;
	}
}