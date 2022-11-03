import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  AttachmentBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("pong"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: "Secret Pong!", ephemeral: true });
    await interaction.followUp({ content: "Pong again!", ephemeral: true });
  },
};
