const { VoiceChannel } = require("discord.js");

module.exports = {
	data: {
		name: `getVoiceMembers`,
	},
	async execute(interaction, client) {

		members = VoiceChannel.members
		await interaction.reply({
			content: `voiceChannel: unknown`,
		});
	},
};
