import Bot from "../../core/client";
import { Event } from "../../models";
import {
	Collection,
	CommandInteraction,
	CommandInteractionOptionResolver,
	inlineCode,
	InteractionType,
} from "discord.js";
import { CommandOptions } from "../../types";

export default new Event("interactionCreate", async (client, interaction) => {
	if (interaction.type !== InteractionType.ApplicationCommand) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		const cooldown = await handleCooldown(client, interaction, command);
		if (!cooldown) return;
		return command.execute(client, interaction, interaction.options as CommandInteractionOptionResolver);
	}
	catch {
		return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	}
});

const handleCooldown = async (client: Bot, interaction: CommandInteraction, command: CommandOptions) => {
	if (!command.cooldown) return;
	if (!client.cooldowns.has(command.data.name)) {
		client.cooldowns.set(command.data.name, new Collection());
	}

	const now = Date.now();
	const timestamps = client.cooldowns.get(command.data.name);

	if (timestamps?.has(interaction.user.id)) {
		const expirationTime = Number(timestamps?.get(interaction.user.id)) + command.cooldown;

		if (now < expirationTime) {
			const expiredTimestamp = Math.round(expirationTime / 1_000);
			const nowTimestamp = Math.round(now / 1_000);
			const timeLeft = expiredTimestamp - nowTimestamp;
			await interaction.reply({
				content: `Please wait ${inlineCode(timeLeft.toString())} more second(s) before reusing the ${inlineCode(command.data.name)} command.`,
				ephemeral: true,
			});
			return false;
		}
	}

	timestamps?.set(interaction.user.id, now);
	setTimeout(() => timestamps?.delete(interaction.user.id), command.cooldown);
	return true;
};