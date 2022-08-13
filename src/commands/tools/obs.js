const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('obs')
		.setDescription('OBS Utility Options'),
	async execute(interaction, client) {
		const button = new ButtonBuilder()
			.setCustomId('getVoiceMembers')
			.setLabel('Get Voice Members')
			.setStyle(ButtonStyle.Primary);

		await interaction.reply({
			components: [new ActionRowBuilder().addComponents(button)]
		});
	},
};