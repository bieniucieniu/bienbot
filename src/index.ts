import { Client, Events, GatewayIntentBits, messageLink } from "discord.js";
import { Token, GuildID } from "./config.json";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log("bot ready");

  const guild = client.guilds.cache.get(GuildID);

  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }

  commands?.create({
    name: "ping",
    description: "replices with pong",
  });
});

client.on(Events.MessageCreate, (message) => {
  if (message.content === "ping") {
    message.reply({
      content: "pong",
    });
  }
});

client.login(Token);
