import {
  AttachmentBuilder,
  Client,
  Events,
  GatewayIntentBits,
} from "discord.js";
import { Token } from "../config.json";
import commands from "./commands";
import { deployCommnads } from "./deployCommands";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  deployCommnads();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName) as any;

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  interaction.replied;

  await command.execute(interaction);
});

client.login(Token);
