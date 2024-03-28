import { logger } from "../../function";
import { Event } from "../../models";

export default new Event("error", (client, info) => {
	logger.error(info);
});
