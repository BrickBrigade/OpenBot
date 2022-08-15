module.exports = {
	data: {
		name: `updateScene`,
	},
	async execute(interaction, client) {
		const { default: OBSWebSocket } = require('obs-websocket-js');
		const obs = new OBSWebSocket();

		await obs.connect();

		const guild = client.guilds.cache.get(interaction.guildId);
		const member = guild.members.cache.get(interaction.member.user.id);
		const voiceChannel = member.voice.channel;
		const vcMemberListSize = voiceChannel.members.size;
		const memberArray = [];
		voiceChannel.members.forEach((user) => {
			memberArray.push(user.displayName);
		});

		startSceneCall = obs
			.call('GetCurrentProgramScene')
			.then((startingScene) => {
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
				sceneName: `group (${vcMemberListSize})`,
			});
			obs.call('GetCurrentProgramScene').then((response) => {
				interaction.reply(`${vcMemberListSize} people in your current channel:
				
Switched to: "${response.currentProgramSceneName}"`);
			});
		}
	},
};
