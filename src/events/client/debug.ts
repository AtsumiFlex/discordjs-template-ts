import { logger } from "../../function";
import { Event } from "../../models";

export default new Event("debug", (client, info) => {
	logger.debug(info);
});
