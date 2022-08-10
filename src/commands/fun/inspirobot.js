const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inspirobot')
		.setDescription('Returns Inspirational Image!'),
	async execute(interaction, client) {
		const res = await fetch('https://inspirobot.me/api?generate=true'.toString());
		obj = await res.text()
		await interaction.reply({
			files: [obj]
		})
	},
};
