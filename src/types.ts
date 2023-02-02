import { Player } from "discord-player";
import {
	ChatInputCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";

export type Command = {
	data: any;
	execute: (
		interaction: ChatInputCommandInteraction,
		player?: Player
	) => Promise<void>;
};

export type ContextMenuApp = {
	data: any;
	execute: (interaction: UserContextMenuCommandInteraction) => Promise<void>;
};

export type videoData = {
	url: string;
	title?: string;
	channelTitle?: string;
	publishTime?: string;
	thumbnailsUrl?: string;
};
