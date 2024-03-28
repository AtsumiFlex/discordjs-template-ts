import { logger } from "../../function";
import { Event } from "../../models";

export default new Event("cacheSweep", (client, info) => {
	logger.warn(info);
});
