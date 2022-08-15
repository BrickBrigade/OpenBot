module.exports = {
	data: {
		name: 'unlisten',
	},
	async execute(interaction, client) {
		const { default: OBSWebSocket } = require('obs-websocket-js');
		const obs = new OBSWebSocket();

		await obs.disconnect();
	},
};
