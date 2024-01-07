import { Event } from "../../models";
import { logger } from "../../function";

export default new Event("error", (client, info) => {
	logger.error(info);
});