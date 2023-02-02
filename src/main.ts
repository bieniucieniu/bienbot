import { Client, Events, GatewayIntentBits } from "discord.js";
import commands from "./slashCommands";
import { deployCommnads } from "./deployCommands";
import dotenv from "dotenv";
import contextMenuApps from "./contextMenus";
import { Player, Queue, Track } from "discord-player";
import "discord-player/smoothVolume";

dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});

const player = new Player(client, {
	ytdlOptions: {
		filter: "audioonly",
	},
});

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	deployCommnads();
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	await command.execute(interaction, player);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isUserContextMenuCommand()) return;

	const app = contextMenuApps.get(interaction.commandName);

	if (!app) return;

	await app.execute(interaction);
});

player.on("trackStart", (queue: Queue, track: Track) => {
	console.log(queue);
	// console.log(track);
});

client.login(process.env.TOKEN);
