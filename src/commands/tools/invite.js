const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Returns bot invite link!'),
	async execute(interaction) {
		await interaction.reply({
			content: "Here's my invite link!\nhttps://discord.com/api/oauth2/authorize?client_id=1005145943282286753&permissions=8&scope=bot%20applications.commands"
		})
	},
};
