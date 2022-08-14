const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Returns an embed.'),
	async execute(interaction, client) {
		const embed = new EmbedBuilder()
			.setColor(0x18e1ee)
			.setAuthor({
				iconURL: interaction.user.displayAvatarURL(),
				name: interaction.user.tag,
				url: `https://example.com/`
			})
			.setTitle(`This is an EMBED!`)
			.setURL(`https://example.com/`)
			.setDescription(`This is a very cool description!`)
			.setThumbnail(client.user.displayAvatarURL())
			.addFields([
				{
					name: `Field 1`,
					value: `Field value 1`,
					inline: true,
				},
				{
					name: `Field 2`,
					value: `Field value 2`,
					inline: true,
				},
			])
			.setImage(client.user.displayAvatarURL())
			.setFooter({
				iconURL: client.user.displayAvatarURL(),
				text: client.user.tag,
			})
			.setTimestamp(Date.now());

		await interaction.reply({
			embeds: [embed],
		});
	},
};
