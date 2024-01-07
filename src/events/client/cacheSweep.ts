import { Event } from "../../models";
import { logger } from "../../function";

export default new Event("cacheSweep", (client, info) => {
	logger.warn(info);
});