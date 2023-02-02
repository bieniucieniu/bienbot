import { Command } from "../types";
import { Collection } from "discord.js";

import { ban } from "./ban";
import { krzysztof } from "./krzysztof";
import { user } from "./user";
import { ping } from "./ping";
import { buttons } from "./buttons";
import { selectMenu } from "./selectMenu";
import { modal } from "./modal";
import { play } from "./musicPlayer/play";
import { stop } from "./musicPlayer/stop";

const commands: Command[] = [
	ban,
	krzysztof,
	user,
	ping,
	buttons,
	selectMenu,
	modal,
	play,
	stop,
];
const commandsCollection = new Collection<string, Command>();

commands.forEach((command) => {
	commandsCollection.set(command.data.name, command);
});

export default commandsCollection;
