import { Event } from "../../models";
import { logger } from "../../function";

export default new Event("warn", (client, info) => {
	logger.warn(info);
});