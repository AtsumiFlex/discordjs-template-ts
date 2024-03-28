import { GatewayIntentBits, Partials } from "discord.js";
import { config } from "dotenv";
import Bot from "./core/client";

config();

const bot = new Bot({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution],
	partials: [Partials.Channel, Partials.Message, Partials.Reaction, Partials.User, Partials.ThreadMember, Partials.GuildScheduledEvent, Partials.GuildMember],
});

bot.start();
