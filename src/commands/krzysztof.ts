import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  AttachmentBuilder,
  time,
} from "discord.js";

export const krzysztof = {
  data: new SlashCommandBuilder()
    .setName("krzysztof")
    .setDescription("krzysztof is spining")
    .addStringOption((option) =>
      option
        .setName("left_or_right")
        .setDescription("left or right?")
        .addChoices(
          { name: "left", value: "left" },
          { name: "right", value: "right" }
        )
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      await interaction.deferReply();
      const images = [
        new AttachmentBuilder("./src/assets/krzysztof-north.jpg"),
        new AttachmentBuilder("./src/assets/krzysztof-east.jpg"),
        new AttachmentBuilder("./src/assets/krzysztof-south.jpg"),
        new AttachmentBuilder("./src/assets/krzysztof-west.jpg"),
        new AttachmentBuilder("./src/assets/krzysztof-final.jpg"),
      ];
      console.log(interaction.options.getString("left_or_right"));

      if (interaction.options.getString("left_or_right") === "left") {
        for (let i = images.length - 2; i > 0; i--) {
          await interaction.editReply({
            files: [images[i]],
          });
        }
      } else {
        for (let i = 0; i < images.length - 1; i++) {
          await interaction.editReply({
            files: [images[i]],
          });
        }
      }
      await interaction.editReply({
        files: [images[images.length - 1]],
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await interaction.deleteReply();
    } catch (error) {
      console.error(error);
    }
  },
};
