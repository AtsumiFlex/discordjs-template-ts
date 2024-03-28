import { Command } from "../../models";

export default new Command({
	data: {
		name: "ping",
		description: "Ping command",
	},
	category: "category",
	execute: async (client, interaction, args) => {
		await interaction.reply({
			content: "Pong!",
			ephemeral: true,
		});
	},
});
