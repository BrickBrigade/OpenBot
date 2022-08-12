require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of functionFiles)
		require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.on('messageCreate', ()=>{
	console.log('heard message.');
});
client.on('ready', ()=>{
	console.log('I am ready!');
});
client.login(token);
