import {
	ActionRowBuilder,
	ChatInputCommandInteraction,
	ComponentType,
	SelectMenuBuilder,
	SelectMenuComponentOptionData,
	SlashCommandBuilder,
} from "discord.js";

export const selectMenu = {
	data: new SlashCommandBuilder()
		.setName("selectmenu")
		.setDescription("menu to select")
		.addIntegerOption((option) =>
			option.setName("num").setDescription("number of item").setMaxValue(5)
		),
	async execute(interaction: ChatInputCommandInteraction) {
		try {
			const num = interaction.options.getInteger("num") || 1;

			const option: SelectMenuComponentOptionData[] = [];
			for (let i = 0; i < num; i++) {
				option.push({
					label: "Select me",
					description: `option-${i}`,
					value: `${i}_option`,
				});
			}

			const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
				new SelectMenuBuilder()
					.setCustomId("select")
					.setPlaceholder("Nothing selected")
					.addOptions(...option, {
						label: "Select me",
						description: "end",
						value: "end",
					})
			);

			await interaction.reply({ content: "Pong!", components: [row] });

			const collector = interaction.channel!.createMessageComponentCollector({
				filter: (i) => i.customId === "select" || i.customId === "end",
				componentType: ComponentType.SelectMenu,
				time: 120_000,
			});

			collector.on("collect", async (i) => {
				await i.update(i.values[0]);
				if (i.values[0] === "end") collector.stop();
			});

			collector.on("end", async (collected) => {
				console.log(`Collected ${collected.size} items`);
				await interaction.editReply({ content: "end", components: [] });
			});
		} catch (error) {
			interaction.reply({ content: "error", ephemeral: true });
			console.error(error);
		}
	},
};
