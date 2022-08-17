module.exports = {
	data: {
		name: 'channel-menu',
	},
	async execute(interaction, client) {
		const { default: OBSWebSocket } = require('obs-websocket-js');
		const obs = new OBSWebSocket();
		const channelName = interaction.values.toString();
		await obs.connect();
		console.log(`started watching ${channelName}`);
		interaction.guild.channels.cache.find(
			(channel) => channel.name === channelName
		);
		client.on('voiceStateUpdate', async (oldState, newState) => {
			const sceneArray = [];
			await obs.call('GetSceneList').then((obsScenes) => {
				for (const i of obsScenes.scenes) {
					sceneArray.push(i.sceneName);
				}
			});
			if (newState.channel !== null) {
				if (newState.channel.name === channelName) {
					// console.log(newState.channel.members.size);
					let channelSize = newState.channel.members.size;
					let wantedSceneName = `group (${channelSize})`;
					console.log(`${newState.member.displayName} joined ${channelName}`);
					if (sceneArray.includes(`group (${channelSize})`)) {
						await obs.call('SetCurrentProgramScene', {
							sceneName: wantedSceneName,
						});
						obs.call('GetCurrentProgramScene').then((res) => {
							interaction.editReply(
								`Switched to ${res.currentProgramSceneName}`
							);
						});
					} else {
						await interaction.editReply(
							`Can't find OBS scene: "${wantedSceneName}"...\nDid nothing.`
						);
					}
				}
			} else if (oldState.channel !== null) {
				if (oldState.channel.name === channelName) {
					let channelSize = oldState.channel.members.size;
					let wantedSceneName = `group (${channelSize})`;
					channelSize = oldState.channel.members.size;
					console.log(`${oldState.member.displayName} left ${channelName}`);
					if (sceneArray.includes(`group (${channelSize})`)) {
						await obs.call('SetCurrentProgramScene', {
							sceneName: wantedSceneName,
						});
						obs.call('GetCurrentProgramScene').then((res) => {
							interaction.editReply(
								`Switched to ${res.currentProgramSceneName}`
							);
						});
					} else {
						await interaction.editReply(
							`Can't find OBS scene: "${wantedSceneName}"...\nDid nothing.`
						);
					}
				}
			}
		});
		interaction.reply(`watching ${channelName}`);
		obs.on('CustomEvent', (e) => {
			if (e.action === 'shutdown') {
				obs.disconnect();
			}
		});
	},
};
