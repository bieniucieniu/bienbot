import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const ping = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong")
    .addUserOption((option) =>
      option.setName("target").setDescription("The user")
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(`pong ${interaction.options.getUser("target")}`);
  },
};
