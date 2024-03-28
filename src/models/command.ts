import type { CommandOptions } from "../types";

export class Command implements CommandOptions {
	public data: CommandOptions["data"];

	public category: CommandOptions["category"];

	public execute: CommandOptions["execute"];

	public constructor(public options: CommandOptions) {
		this.data = options.data;
		this.category = options.category;
		this.execute = options.execute;
	}
}
