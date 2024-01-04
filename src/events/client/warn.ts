import { EventOptions } from "../../types";

export default {
	event: "warn",
	listener: (client, info) => {
		console.warn(info);
	},
} satisfies EventOptions<"warn">;