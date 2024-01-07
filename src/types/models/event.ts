import Bot from "../../core/client";
import { Awaitable, ClientEvents } from "discord.js";

// Define an interface for EventOptions
export interface EventOptions<K extends keyof ClientEvents> {
    event: K;
    once?: boolean; // Boolean to specify if the event should be executed only once
    listener: (client: Bot, ...args: ClientEvents[K]) => Awaitable<any>;
}