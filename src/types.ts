import { ChatInputCommandInteraction } from "discord.js";

export type Command = {
  data: any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  executeSelectMenu?: (
    interaction: ChatInputCommandInteraction
  ) => Promise<void>;
};
