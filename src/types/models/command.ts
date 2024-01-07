import Bot from "../../core/client";
import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver } from "discord.js";

// Define an interface for CommandOptions
export interface CommandOptions {
    data: ChatInputApplicationCommandData;
    category: string;
    cooldown?: number; // Optional cooldown for the command
    execute: (client: Bot, interaction: CommandInteraction, args: CommandInteractionOptionResolver) => Promise<void>;
}