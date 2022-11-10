const { SlashCommandBuilder, SlashCommandStringOption } = require("discord.js");

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('setbotname')
// 		.setDescription("Change the bot's name in the server"),
// 	async execute(interaction, client) {
// 		const message = await interaction.deferReply({
// 			fetchReply: true,
// 		});

// 		const newMessage = `PONG!!!\nAPI Latency: ${client.ws.ping}\nClient Ping: ${
// 			message.createdTimestamp - interaction.createdTimestamp
// 		}`;
// 		await interaction.editReply({
// 			content: newMessage,
// 		});
// 	},
// };

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setbotname")
		.setDescription("Change the bot's name in the server")
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("what to change the bot's name to")
				.setRequired(true)
		),
	async execute(interaction, client) {
		const botName = interaction.guild.members.me.displayName;
		const newName = interaction.options.getString("name");
		interaction.guild.members.me.setNickname(newName);
		await interaction.reply({
			content: `changed name to ${newName}`,
		});
	},
};
