import { Event } from "../../models";
import { logger } from "../../function";

export default new Event("debug", (client, info) => {
	logger.debug(info);
});