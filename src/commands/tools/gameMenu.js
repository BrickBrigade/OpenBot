const {
	SlashCommandBuilder,
	SelectMenuBuilder,
	ActionRowBuilder,
	SelectMenuOptionBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('Returns a select menu!'),
	async execute(interaction, client) {
		const menu = new SelectMenuBuilder()
			.setPlaceholder('Select your game roles')
			.setCustomId('sub-menu')
			.setMinValues(1)
			.setMaxValues(2)
			.setOptions(
				new SelectMenuOptionBuilder({
					label: 'Option 1',
					value: 'Option 1',
				}),
				new SelectMenuOptionBuilder({
					label: 'Option 2',
					value: 'Option 2',
				})
			);

		await interaction.reply({
			components: [new ActionRowBuilder().addComponents(menu)],
		});
	},
};
