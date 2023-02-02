import { Player } from "discord-player";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const stop = {
	data: new SlashCommandBuilder().setName("stop").setDescription("stop track"),
	async execute(interaction: ChatInputCommandInteraction, player?: Player) {
		const queue = player?.createQueue(interaction.guild!, {
			metadata: { Channel: interaction.channel },
		});
		if (!queue || !queue.playing) {
			interaction.reply({
				content: "❌ | No music is being played!",
			});
			return;
		}
		queue.destroy();
		interaction.reply({
			content: "🛑 | Stopped the player!",
		});
	},
};
