import { EventOptions } from "../../types";

export default {
	event: "debug",
	listener: (client, info) => {
		console.debug(info);
	},
} satisfies EventOptions<"debug">;