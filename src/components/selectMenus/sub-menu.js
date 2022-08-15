module.exports = {
	data: {
		name: `sub-menu`,
	},
	async execute(interaction) {
		await interaction.reply({
			content: interaction.values.toString(),
		})
	},
};
