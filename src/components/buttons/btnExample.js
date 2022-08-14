module.exports = {
	data: {
		name: `btnExample`,
	},
	async execute(interaction, client) {
		await interaction.reply({
			content: `https://example.com/`,
		});
	},
};
