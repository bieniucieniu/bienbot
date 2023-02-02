import {
	ApplicationCommandType,
	ContextMenuCommandBuilder,
	UserContextMenuCommandInteraction,
} from "discord.js";

export const getUser = {
	data: new ContextMenuCommandBuilder()
		.setName("get user")
		.setType(ApplicationCommandType.User),
	async execute(interaction: UserContextMenuCommandInteraction) {
		try {
			interaction.reply({
				content: `${interaction.targetUser}`,
				ephemeral: true,
			});
		} catch (error) {
			console.log(error);
		}
	},
};
