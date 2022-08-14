const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('Return a button!'),
	async execute(interaction) {
		const button = new ButtonBuilder()
			.setCustomId('btnExample')
			.setLabel('Button #1')
			.setStyle(ButtonStyle.Primary);
		await interaction.reply({
			components: [new ActionRowBuilder().addComponents(button)]
		});
	},
};
