module.exports = {
	data: {
		name: `getVoiceMembers`,
	},
	async execute(interaction, client) {

		

		const guild = client.guilds.cache.get(interaction.guildId)
		const member = guild.members.cache.get(interaction.member.user.id)
		const voiceChannel = member.voice.channel
		const vcMemberListSize = voiceChannel.members.size
		const memberArray = []
		voiceChannel.members.forEach(user => {memberArray.push(user.displayName)})

		const message = `There is only ${vcMemberListSize} person in ${voiceChannel}. You are all alone, ${member.displayName}`
		const message2 = `There are ${vcMemberListSize} people in ${voiceChannel} including ${memberArray.toString()}`

		if (vcMemberListSize === 1) {
			await interaction.reply(message)
		} else {
			await interaction.reply(message2)
		}
	}
};
