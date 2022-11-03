import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  AttachmentBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("krzysztof")
    .setDescription("krzysztof is spining"),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      await interaction.deferReply({ ephemeral: true });
      const images = [
        new AttachmentBuilder("./src/assets/krzysztof-north.jpg"),
        new AttachmentBuilder("./src/assets/krzysztof-east.jpg"),
        new AttachmentBuilder("./src/assets/krzysztof-south.jpg"),
        new AttachmentBuilder("./src/assets/krzysztof-west.jpg"),
        new AttachmentBuilder("./src/assets/krzysztof-final.jpg"),
      ];

      for (const img of images) {
        interaction.editReply({
          files: [img],
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      interaction.deleteReply();
    } catch (error) {
      console.log(error);
    }
  },
};
