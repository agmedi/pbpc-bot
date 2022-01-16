const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testtt')
		.setDescription('EXEC ONLY DO NOT USE'),
	async execute(interaction) {

		let emojis = await interaction.guild.emojis.fetch();
		let emojiKeys = emojis.keys();

		// TEST REPLY
		await interaction.reply(emojiKeys.toString());
	},
};