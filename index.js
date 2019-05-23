import { Client } from 'discord.js';
import Enmap from 'enmap';
import { readdir } from 'fs';

const client = new Client();
import config, { token } from './config.json';
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Enmap();

readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split('.')[0];
		console.log(`Attempting to load command ${commandName}`);
		client.commands.set(commandName, props);
	});
});

client.login(token);
