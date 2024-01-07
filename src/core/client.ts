import Handlers from "./handlers";
import { Client, ClientOptions, Collection, Snowflake } from "discord.js";
import { CommandOptions } from "../types";

export default class Bot extends Client {
	public commands: Collection<string, CommandOptions> = new Collection();
	public cooldowns: Collection<string, Collection<Snowflake, number>> = new Collection();
	private readonly handlers = new Handlers(this);

	public constructor(options: ClientOptions) {
		super(options);
	}

	public start = () => {
		this.setMaxListeners(0);
		void this.login(process.env.TOKEN);
		void this.handlers.init();
	};
}