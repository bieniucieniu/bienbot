import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  AttachmentBuilder,
  ComponentType,
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
      const row: ButtonBuilder[] = [];

      const num = interaction.options.getInteger("num") || 1;

      for (let i = 0; i < num; i++) {
        row.push(
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
        components: [new ActionRowBuilder<ButtonBuilder>().setComponents(row)],
        embeds: [embed],
      });

      if (!interaction.channel) {
        interaction.editReply({
          content: "no channel, take krzysztof instead",
          files: [new AttachmentBuilder("./src/assets/krzysztof-final.jpg")],
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        interaction.deleteReply();
        return;
      }

      const collector = interaction.channel.createMessageComponentCollector({
        filter: (i) => {
          console.log(i.customId);
          return i.customId.startsWith("button");
        },
        componentType: ComponentType.Button,
        time: 15_000,
      });

      collector.on("collect", async (interaction) => {
        await interaction.deferUpdate();
      });

      collector.on("end", async (collected) => {
        console.log(`Collected ${collected.size} items`);
        // console.log(collected);
        await interaction.editReply({
          components: [
            new ActionRowBuilder<ButtonBuilder>().setComponents(
              row.map((e) => e.setDisabled())
            ),
          ],
          embeds: [embed],
        });
      });
    } catch (error) {
      interaction.reply({ content: "error", ephemeral: true });
      console.error(error);
    }
  },
};
