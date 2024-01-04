import { EventOptions } from "../../types";
import { ActivityType } from "discord.js";

export default {
	event: "ready",
	listener: async (client) => {
		console.log(`${client.user?.tag} is ready!`);

		await client.application?.commands.set(client.commands.map((command) => command.data));

		client.user?.setActivity("AtsumiFlex for the Template!", { type: ActivityType.Watching });
	},
} satisfies EventOptions<"ready">;