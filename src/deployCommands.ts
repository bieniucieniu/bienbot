import { REST, Routes } from "discord.js";
import { Token, GuildID, ClientID } from "../config.json";

import commands from "./commands";

export const deployCommnads = async () => {
  const commandsJson = commands.map((command: any) => {
    return command?.data.toJSON();
  });

  const rest = new REST({ version: "10" }).setToken(Token);

  try {
    const data = (await rest.put(
      Routes.applicationGuildCommands(ClientID, GuildID),
      { body: commandsJson }
    )) as {}[];

    console.log(`loaded ${data.length} commands`);
  } catch (error) {
    console.error(error);
  }
};
