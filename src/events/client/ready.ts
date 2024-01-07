import { Event } from "../../models";
import { logger } from "../../function";
import { ActivityType } from "discord.js";

export default new Event("ready", async (client) => {
	logger.info(`${client.user?.tag} is ready!`);

	await client.application?.commands.set(client.commands.map((command) => command.data));

	client.user?.setActivity("AtsumiFlex for the Template!", { type: ActivityType.Watching });
});