const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('obs')
		.setDescription('OBS Utility Options'),
	async execute(interaction, client) {
		const button1 = new ButtonBuilder()
			.setCustomId('updateScene')
			.setLabel('Manual Update')
			.setStyle(ButtonStyle.Secondary)
		const button2 = new ButtonBuilder()
			.setCustomId('listen')
			.setLabel("Start live switching")
			.setStyle(ButtonStyle.Success);
		const button3 = new ButtonBuilder()
		.setCustomId('unlisten')
		.setLabel('Stop live switching')
		.setStyle(ButtonStyle.Danger)
		await interaction.reply({
			components: [new ActionRowBuilder().addComponents(button1, button2, button3)],
		});
	},
};
