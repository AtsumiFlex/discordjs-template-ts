import { ActivityType } from "discord.js";
import { logger } from "../../function";
import { Event } from "../../models";

export default new Event("ready", async (client) => {
	logger.info(`${client.user?.tag} is ready!`);

	for (const guild of client.guilds.cache.values()) {
		await client.application?.commands.set(client.commands.map((command) => command.data), guild.id);
	}

	client.user?.setActivity("❤️ AtsumiFlex for the Template!", { type: ActivityType.Watching });
});
