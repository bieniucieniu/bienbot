import { ban } from "./ban";
import { krzysztof } from "./krzysztof";
import { user } from "./user";
import { ping } from "./ping";
import { buttons } from "./buttons";
import {
  ChatInputCommandInteraction,
  Collection,
  SlashCommandBuilder,
} from "discord.js";

type Command = {
  data: any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

const commands: Command[] = [ban, krzysztof, user, ping, buttons];
const commandsCollection = new Collection<string, Command>();

commands.forEach((command) => {
  commandsCollection.set(command.data.name, command);
});

export default commandsCollection;
