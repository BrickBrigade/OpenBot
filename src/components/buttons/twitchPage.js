module.exports = {
	data: {
		name: `twitchPage`,
	},
	async execute(interaction, client) {
		await interaction.reply({
			content: `https://www.twitch.tv/guineapiggamer2375`,
		});
	},
};
