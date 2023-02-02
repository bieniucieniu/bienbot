import { Collection } from "discord.js";
import { Command, ContextMenuApp } from "../types";
import { getUser } from "./getUser";

const apps: ContextMenuApp[] = [getUser];
const contextMenuAppsCollection = new Collection<string, ContextMenuApp>();

apps.forEach((app) => {
  contextMenuAppsCollection.set(app.data.name, app);
});

export default contextMenuAppsCollection;
