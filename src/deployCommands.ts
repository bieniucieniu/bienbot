import { REST, Routes } from "discord.js";
import commandsCollection from "./slashCommands";
import contextMenuAppsCollection from "./contextMenus";

export const deployCommnads = async () => {
	const commandsJson = commandsCollection.map((command) =>
		command?.data.toJSON()
	);
	const contextMenuAppJson = contextMenuAppsCollection.map((app) =>
		app?.data.toJSON()
	);

	const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

	try {
		const l = (
			(await rest.put(
				Routes.applicationGuildCommands(
					process.env.CLIENT_ID!,
					process.env.GUILD_ID!
				),
				{ body: commandsJson.concat(contextMenuAppJson) }
			)) as {}[]
		).length;

		console.log(`loaded ${l} commands`);
	} catch (error) {
		console.error(error);
	}
};
