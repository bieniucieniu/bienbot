import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

export const buttons = {
  data: new SlashCommandBuilder()
    .setName("buttons")
    .setDescription("buttons to press")
    .addIntegerOption((option) =>
      option.setName("num").setDescription("number of buttons").setMaxValue(5)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const row = new ActionRowBuilder<ButtonBuilder>();

      let num = interaction.options.getInteger("num") || 1;

      for (let i = 0; i < num; i++) {
        row.addComponents(
          new ButtonBuilder()
            .setCustomId(`button-${i + 1}`)
            .setLabel(`button-${i + 1}`)
            .setStyle(ButtonStyle.Danger)
        );
      }

      const embed = new EmbedBuilder()
        .setColor(0x501010)
        .setTitle("link")
        .setURL("https://bieniu.pl")
        .setDescription("some buttons to click");

      await interaction.reply({
        components: [row],
        embeds: [embed],
      });
    } catch (error) {
      interaction.reply({ content: "error", ephemeral: true });
      console.error(error);
    }
  },
};
