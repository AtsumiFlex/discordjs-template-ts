import { logger } from "../../function";
import { Event } from "../../models";

export default new Event("warn", (client, info) => {
	logger.warn(info);
});
