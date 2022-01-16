const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('journal')
		.setDescription('Write a journal entry!')
		.addStringOption(option => option.setName('reply').setDescription('The ID of the message you want to reply to.')),
	async execute(client, interaction) {

		if (interaction.channel) {
			await interaction.reply('Please run this command by Direct Messaging me.');
		}
		else {
			// CHANNELS
			const outChannel = client.channels.cache.get('897774572869414952');
			const inChannel = await interaction.user.createDM();
			const replyID = interaction.options.getString('reply');

			if (replyID) {
				if (String(replyID).match("[0-9]+")) {
					await interaction.reply('That is not a message ID. Here is a tutorial: https://www.youtube.com/watch?v=omJyxPAwUGw');
					return;
                }
				else if (!outChannel.messages.fetch(replyID)) {
					await interaction.reply('Not a valid message ID, make sure you copied the ID of a message in the diary channel.');
					return;
                }
            }

			// COLLECT MESSAGE
			await inChannel.send('Okay, what would you like to say?');
			const filter = (m) => m.author.id === interaction.user.id;
			const contentCollector = inChannel.createMessageCollector(filter, { max: 1, time: 30000 });
			contentCollector.on("collect", (m) => {
				if (m.author.bot) return;
				outChannel.send(m.content);
				contentCollector.stop('sent');
			})

			await contentCollector.on("end", (collected, reason) => {
				if (reason === 'time') {
					interaction.reply('Sorry you ran out of time.');
				} else if (reason === 'sent') {
					interaction.reply('Okay, sent!');
				}
			})
        }


	},
};