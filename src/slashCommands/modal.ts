import {
	ModalActionRowComponentBuilder,
	ActionRowBuilder,
	ChatInputCommandInteraction,
	ModalBuilder,
	SlashCommandBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";

export const modal = {
	data: new SlashCommandBuilder().setName("modal").setDescription("modal"),
	async execute(interaction: ChatInputCommandInteraction) {
		const modal = new ModalBuilder()
			.setCustomId("sample_modal")
			.setTitle("modal");

		const firstActionRow =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
					.setCustomId("favoriteColorInput")
					.setLabel("What's your favorite color?")
					.setStyle(TextInputStyle.Short)
			);
		const secondActionRow =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
					.setCustomId("hobbiesInput")
					.setLabel("What's some of your favorite hobbies?")
					.setStyle(TextInputStyle.Paragraph)
			);

		modal.addComponents(firstActionRow, secondActionRow);

		await interaction.showModal(modal);

		const submited = await interaction.awaitModalSubmit({
			filter: (i) => i.user.id === interaction.user.id,
			time: 60000,
		});
		console.log(submited);

		if (submited) {
			submited.reply("sus");
		}
	},
};
