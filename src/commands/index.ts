import { Collection } from "discord.js";

import fs from "node:fs";

const commands = new Collection();

fs.readdirSync("./src/commands").forEach((file) => {
  if (file === "index.ts") return;

  if (file.endsWith(".ts")) {
    const command = require(`./${file}`);
    commands.set(command.data.name, command);
  }
});

export default commands;
