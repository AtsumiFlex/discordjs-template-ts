import { CommandOptions } from "../types";

export class Command implements CommandOptions {
	data: CommandOptions["data"];
	category: CommandOptions["category"];
	cooldown?: CommandOptions["cooldown"];
	execute: CommandOptions["execute"];

	constructor(options: CommandOptions) {
		this.data = options.data;
		this.category = options.category;
		this.cooldown = options.cooldown;
		this.execute = options.execute;
	}
}