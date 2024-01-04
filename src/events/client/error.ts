import { EventOptions } from "../../types";

export default {
	event: "error",
	listener: (client, error) => {
		console.error(error.message);
	},
} satisfies EventOptions<"error">;