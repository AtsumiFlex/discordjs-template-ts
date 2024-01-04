import { CommandOptions } from "../../types";

export default {
	data: {
		name: "ping",
		description: "Ping command",
	},
	category: "category",
	cooldown: 5000,
	execute: async (client, interaction, args) => {
		await interaction.reply({ content: "Pong!", ephemeral: true });
	},

} satisfies CommandOptions;