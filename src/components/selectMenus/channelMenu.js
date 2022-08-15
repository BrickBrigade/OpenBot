module.exports = {
	data: {
		name: 'channel-menu',
	},
	async execute(interaction, client) {
		const { default: OBSWebSocket } = require('obs-websocket-js');
		const obs = new OBSWebSocket();
		const channelName = interaction.values.toString();
		await obs.connect();
		console.log(channelName);
		interaction.guild.channels.cache.find(
			(channel) => channel.name === channelName
		);
		// console.log(watchedChannel)
		client.on('voiceStateUpdate', async (oldState, newState) => {
			if (newState.channel !== null && newState.channel.name === channelName) {
				// console.log(newState.channel.members.size);
				var channelSize = newState.channel.members.size;
				console.log(`${newState.member.displayName} joined ${channelName}`);

				await obs.call('SetCurrentProgramScene', {
					sceneName: `group (${channelSize})`,
				});
				obs.call('GetCurrentProgramScene').then((res) => {
					interaction.editReply(`Switched to ${res.currentProgramSceneName}`);
				});
			} else if (
				oldState.channel !== null &&
				oldState.channel.name === channelName
			) {
				var channelSize = oldState.channel.members.size;
				console.log(`${oldState.member.displayName} left ${channelName}`);

				await obs.call('SetCurrentProgramScene', {
					sceneName: `group (${channelSize})`,
				});
				obs.call('GetCurrentProgramScene').then((res) => {
					interaction.editReply(`Switched to ${res.currentProgramSceneName}`);
				});
			}
		});
		interaction.reply(`watching ${channelName}`);
	},
};
