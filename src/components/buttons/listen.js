const {
	SelectMenuBuilder,
	ActionRowBuilder,
	SelectMenuOptionBuilder,
} = require('discord.js');

module.exports = {
	data: {
		name: `listen`,
	},
	async execute(interaction, client) {
		const channelList = interaction.guild.channels.cache.filter(channel => channel.type === 2)
		const channelArray = []
		channelList.forEach(channel => {channelArray.push(channel.name)})
		// console.log(channelArray)
		const menu = new SelectMenuBuilder()
			.setPlaceholder('Select channel to watch')
			.setCustomId('channel-menu')
			.setMinValues(1)
			.setMaxValues(1);
			for (const channel of channelArray) {
				menu.addOptions(new SelectMenuOptionBuilder()
				.setLabel(channel)
				.setValue(channel)
			)}
		await interaction.reply({
			components: [new ActionRowBuilder().addComponents(menu)],
		});
	},
};
