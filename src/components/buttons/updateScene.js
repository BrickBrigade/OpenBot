module.exports = {
	data: {
		name: `updateScene`,
	},
	async execute(interaction, client) {
		const guild = client.guilds.cache.get(interaction.guildId);
		const member = guild.members.cache.get(interaction.member.user.id);
		const voiceChannel = member.voice.channel;
		if (voiceChannel !== null) {
			console.log('check 1')
			const { default: OBSWebSocket } = require('obs-websocket-js');
			const obs = new OBSWebSocket();
	
			await obs.connect('ws://127.0.0.1:4455');
			console.log('check 2')
	
			const vcMemberListSize = voiceChannel.members.size;
			const memberArray = [];
	
			startSceneCall = obs
				.call('GetCurrentProgramScene')
				.then((startingScene) => {
					console.log('got start scene')
					return startingScene.currentProgramSceneName;
				});
	
			startScene = startSceneCall;
	
			const sceneArray = [];
			await obs.call('GetSceneList').then((obsScenes) => {
				for (const i of obsScenes.scenes) {
					sceneArray.push(i.sceneName);
				}
				return obsScenes;
			});
	
			console.log(sceneArray);
			if (sceneArray.includes(`group (${vcMemberListSize})`)) {
				console.log('it is here');
				await obs.call('SetCurrentProgramScene', {
					sceneName: `group (${vcMemberListSize})`
				})
				console.log('check 3')
				await obs.call('GetCurrentProgramScene').then((response) => {
					console.log('attempting reply')
					interaction.reply(`${vcMemberListSize} people in your current channel:
	
	Switched to: "${response.currentProgramSceneName}"`);
				});
			}
			obs.disconnect();
		} else {
			interaction.reply('you must be in a voice channel to use "Manual Update".')
		}
// 		const { default: OBSWebSocket } = require('obs-websocket-js');
// 		const obs = new OBSWebSocket();

// 		await obs.connect();


// 		const vcMemberListSize = voiceChannel.members.size;
// 		const memberArray = [];

// 		startSceneCall = obs
// 			.call('GetCurrentProgramScene')
// 			.then((startingScene) => {
// 				return startingScene.currentProgramSceneName;
// 			});

// 		startScene = startSceneCall;

// 		const sceneArray = [];
// 		await obs.call('GetSceneList').then((obsScenes) => {
// 			for (const i of obsScenes.scenes) {
// 				sceneArray.push(i.sceneName);
// 			}
// 			return obsScenes;
// 		});

// 		console.log(sceneArray);
// 		if (sceneArray.includes(`group (${vcMemberListSize})`)) {
// 			console.log('it is here');
// 			await obs.call('SetCurrentProgramScene', {
// 				sceneName: `group (${vcMemberListSize})`,
// 			});
// 			obs.call('GetCurrentProgramScene').then((response) => {
// 				interaction.reply(`${vcMemberListSize} people in your current channel:

// Switched to: "${response.currentProgramSceneName}"`);
// 			});
// 			obs.disconnect();
// 		}
	},
};
