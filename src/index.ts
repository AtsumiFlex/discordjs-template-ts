// Import Bot class from client module
import Bot from "./core/client";
import { config } from "dotenv";
import { GatewayIntentBits, Partials } from "discord.js";

// Initialize configuration with debug mode
config({ debug: true });

// Create a new instance of Bot with specific intents and partials
const bot = new Bot({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.Reaction,
		Partials.User,
		Partials.ThreadMember,
		Partials.GuildScheduledEvent,
		Partials.GuildMember,
	],
});

// Start the bot
bot.start();
