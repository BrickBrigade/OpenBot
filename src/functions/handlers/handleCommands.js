const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

// client passed from bot.js
module.exports = (client) => {
	client.handleCommands = async () => {
	// Get all commands
		const commandFolders = fs.readdirSync('./src/commands');
		for (const folder of commandFolders) {
		// handle command folders
			const commandFiles = fs
				.readdirSync(`./src/commands/${folder}`)
				.filter((file) => file.endsWith('.js'));

			// from bot.js
			const { commands, commandArray } = client;
			for (const file of commandFiles) {
				// handle commands
				const command = require(`../../commands/${folder}/${file}`);
				commands.set(command.data.name, command);
				commandArray.push(command.data.toJSON());
				console.log(
					`Command: ${command.data.name} has passed through the handler`
				);
			}
		}
		
	// send all commands to discord
		const clientId = '1005145943282286753';
		const rest = new REST({ version: '9' }).setToken(process.env.token);
		try {
			console.log('Started refreshing application (/) commands.');

			await rest.put(Routes.applicationCommands(clientId), {
				body: client.commandArray,
			});

			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	};
};
