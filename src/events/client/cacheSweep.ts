import { EventOptions } from "../../types";

export default {
	event: "cacheSweep",
	listener: (client, info) => {
		console.warn(info);
	},
} satisfies EventOptions<"cacheSweep">;