import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	GuildMember,
} from "discord.js";
import { Player, QueryType } from "discord-player";
import { queryURL } from "../../fnc/musicPlayer/queryURL";

export const play = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play music")
		.addStringOption((option) =>
			option
				.setName("query")
				.setDescription("The song you want to play")
				.setRequired(true)
		)
		.setDMPermission(false),
	async execute(interaction: ChatInputCommandInteraction, player?: Player) {
		//  za wszystkie grzechy szczerze żałuję i obiecuję poprawę, szczególnie z grzechu
		if (!interaction.guild)
			return void (await interaction.reply({
				content: "only Guild",
				ephemeral: true,
			}));

		const voiceChannel = (interaction.member as GuildMember).voice.channel;

		if (!player)
			return void (await interaction.reply({
				content: "no Player",
				ephemeral: true,
			}));

		if (!voiceChannel)
			return void (await interaction.reply({
				content: "You are not in a voice channel!",
				ephemeral: true,
			}));

		if (interaction.guild?.members.me?.voice.channelId && voiceChannel.id)
			return void (await interaction.reply({
				content: "You are not in my voice channel!",
				ephemeral: true,
			}));
		const query = interaction.options.getString("query")!;
		const queue = player.createQueue(interaction.guild, {
			metadata: {
				channel: interaction.channel,
			},
		});

		// verify vc connection
		try {
			if (!queue.connection) await queue.connect(voiceChannel);
		} catch {
			queue.destroy();
			return void (await interaction.reply({
				content: "Could not join your voice channel!",
				ephemeral: true,
			}));
		}

		await interaction.deferReply();
		const track = await player
			.search(query, {
				requestedBy: interaction.user,
			})
			.then((x) => x.tracks[0]);
		if (!track)
			return void (await interaction.followUp({
				content: `❌ | Track **${query}** not found!`,
			}));

		queue.play(track);

		return void (await interaction.followUp({
			content: `⏱️ | Loading track **${track.title}**!`,
		}));
	},
};
