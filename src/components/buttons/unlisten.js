module.exports = {
	data: {
		name: 'unlisten',
	},
	async execute(interaction, client) {
		const { default: OBSWebSocket } = require('obs-websocket-js');
		const obs = new OBSWebSocket();
		await obs.connect();
		await obs.call('BroadcastCustomEvent', {eventData:{action: 'shutdown'}});
		obs.disconnect();
		client.removeAllListeners('voiceStateUpdate')
		interaction.reply('Stopped Listening.')
	},
};
