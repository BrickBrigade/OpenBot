const {
	SlashCommandBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	PermissionFlagsBits
} = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles, PermissionFlagsBits.ManageMessages)
		.setName("buttonroletest")
		.setDescription("a command to test methods of button role selection")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("add")
				.setDescription("add a button")
				.addStringOption((option) =>
					option
						.setName("id")
						.setDescription("id of message to add to")
						.setRequired(true)
				)
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("channel message is located in")
						.setRequired(true)
				)
				.addRoleOption((option) =>
					option
						.setName("role")
						.setDescription("role associated with this button")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("label")
						.setDescription("a test string")
						.setRequired(false)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("remove")
				.setDescription("remove a button")
				.addStringOption((option) =>
					option
						.setName("id")
						.setDescription("id of message to add to")
						.setRequired(true)
				)
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("channel message is located in")
						.setRequired(true)
				)
				.addNumberOption((option) =>
					option
						.setName("index")
						.setDescription("Position of button starting at 1")
						.setRequired(true)
				)
		),
	roleId: "",
	async execute(interaction, client) {
		console.log("executing");
		// const label = interaction.options.getString("label");

		const message = await interaction.options
			.getChannel("channel")
			.messages.fetch(interaction.options.getString("id"))
			.catch((error) => {
				if (error.code == 10008) {
					console.log("couldn't find message");
					interaction.reply({
						content: "couldn't find message",
						ephemeral: true,
					});
					return "error";
				}
			});
		if (message === "error") return;
		if (interaction.options.getSubcommand() == "add") {
			console.log("adding");
			const roleName = interaction.options.getRole("role").name;
			const roleId = interaction.options.getRole("role").id;

			this.roleId = roleId;

			const newBtn = new ButtonBuilder()
				.setCustomId(`roleButton-${roleId}`)
				.setLabel(roleName)
				.setStyle(ButtonStyle.Primary);

			if (message.author.id == client.user.id) {
				console.log("msg by bot");
				if (message.components.length == 1) {
					console.log(message.components);
					const row = new ActionRowBuilder()
						.setComponents(message.components[0].components)
						.addComponents(newBtn);
					try {
						await message.edit({ components: [row] });
					} catch (error) {
						console.error("That button already exists");
						interaction.reply({
							content: "That button already exists",
							ephemeral: true,
						});
						return;
					}
					// message.edit({ components: [row] });
					interaction.reply({ content: "added", ephemeral: true });
				} else if (message.components.length == 0) {
					const row = new ActionRowBuilder().addComponents(newBtn);
					try {
						await message.edit({ components: [row] });
					} catch (error) {
						console.error("That button already exists");
						interaction.reply({
							content: "That button already exists",
							ephemeral: true,
						});
						return;
					}
				}
			} else {
				console.log("msg not by bot");
				const row = new ActionRowBuilder().addComponents(newBtn);
				const reply = await interaction.reply({
					content: message.content,
					components: [row],
				});
				message.delete();
				const collector = reply.createMessageComponentCollector();
				collector.on("collect", (i) => {
					if (i.member.roles.cache.has(i.customId.split("-")[1])) {
						console.log("has: removing role");
						i.member.roles.remove(i.customId.split("-")[1]);
					} else {
						console.log("doesn't have: adding role");
						i.member.roles.add(i.customId.split("-")[1]);
					}
					i.reply({ content: "done", ephemeral: true });
				});
			}
		} else {
			console.log("removing");
			if ((message.components.length = 1)) {
				const index = interaction.options.getNumber("index");
				const btnArray = message.components[0].components;
				const btnToRemove = btnArray[index];
				console.log(btnToRemove);
				const newBtnArray = btnArray.filter(
					(btn) => btn.custom_id != btnToRemove.custom_id
				);
				console.log(newBtnArray);
				if (newBtnArray.length > 0) {
					const row = new ActionRowBuilder().setComponents(newBtnArray);
					message.edit({ components: [row] });
				} else {
					message.edit({ content: message.content, components: [] });
				}
				interaction.reply({ content: "done", ephemeral: true });
			}
		}

		// const testBtn = new ButtonBuilder()
		// 	.setCustomId(`roleButton-${roleId}`)
		// 	.setLabel(label)
		// 	.setStyle(ButtonStyle.Primary);
		// console.log(message.components.length == 1);
		// console.log(message.components.length == 0);

		// const row = new ActionRowBuilder();

		// if (message.components.length == 0) {
		// 	row.addComponents(testBtn);
		// } else {
		// 	row.setComponents(message.components[0].components).addComponents(testBtn);
		// }
		// if (message.author != client.user) {
		// 	interaction.reply({
		// 		content: testBtn.data.custom_id,
		// 		components: [row],
		// 	});
		// 	message.delete();
		// }

		// buttonFunction.data.roleId = roleId;
		// this.info.push({ roleName: roleName, roleId: roleId, button: testBtn });
		// console.log("finished slash command execution and exported:");
		// console.log(this.info);
	},
};
