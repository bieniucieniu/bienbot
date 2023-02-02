import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChatInputCommandInteraction,
} from "discord.js";

export const ban = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Select a member and ban them.")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("The member to ban")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("reason").setDescription("The reason for banning")
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),

	async execute(interaction: ChatInputCommandInteraction) {
		const target = interaction.options.getUser("target");
		if (!target) {
			interaction.reply("no such a user");
			return;
		}
		const reason =
			interaction.options.getString("reason") ?? "No reason provided";

		await interaction.reply(
			`Banning ${target?.username} for reason: ${reason}`
		);
		await interaction.guild?.members.ban(target);
		// await interaction.guild?.members.unban(target);
	},
};
