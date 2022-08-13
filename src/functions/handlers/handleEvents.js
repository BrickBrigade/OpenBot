const fs = require('fs');

module.exports = (client) => {
	// client passed from bot.js
	client.handleEvents = async () => {
		const eventFolders = fs.readdirSync(`./src/events`);
		for (const folder of eventFolders) {
			// Handle event folders
			const eventFiles = fs
				.readdirSync(`./src/events/${folder}`)
				.filter((file) => file.endsWith(`.js`));
			switch (folder) {
				case 'client':
					for (const file of eventFiles) {
						// Handle client events
						const event = require(`../../events/${folder}/${file}`);
						if (event.once)
							client.once(event.name, (...args) =>
								event.execute(...args, client)
							);
						else
							client.on(event.name, (...args) =>
								event.execute(...args, client)
							);
					}
					break;

				default:
					break;
			}
		}
	};
};
