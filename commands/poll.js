const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Create a poll!')
		.addStringOption(option => option.setName('question').setDescription('What are people voting on').setRequired(true))
		.addStringOption(option => option.setName('option1').setDescription('Emoji choice followed by choice description e.g. \:smile: Make friends today.').setRequired(true))
		.addStringOption(option => option.setName('option2').setDescription('Emoji choice followed by choice description e.g. \:smile: Make friends today.').setRequired(true))
		.addStringOption(option => option.setName('option3').setDescription('Emoji choice followed by choice description e.g. \:smile: Make friends today.'))
		.addStringOption(option => option.setName('option4').setDescription('Emoji choice followed by choice description e.g. \:smile: Make friends today.'))
		.addStringOption(option => option.setName('option5').setDescription('Emoji choice followed by choice description e.g. \:smile: Make friends today.')),
	async execute(client, interaction) {
		// ADD POLL QUESTION
		const question = interaction.options.getString('question');
		var description = question;
		const emojis = await interaction.guild.emojis.fetch();

		// ADD REQUIRED CHOICES
		const option1 = interaction.options.getString('option1');
		const option2 = interaction.options.getString('option2');

		let choice1 = option1.substr(option1.indexOf(" ") + 1);
		let emote1 = option1.split(" ")[0];
		let choice2 = option2.substr(option2.indexOf(" ") + 1);
		let emote2 = option2.split(" ")[0];

		// CHECK EMOTE
		if (!emote1.startsWith('<') && !emote1.startsWith(':')) {
			await interaction.reply('Sorry, choice 1 does not have a valid emote. Correct usage: :emote: Choice description.');
			return;
		}
		if (!emote2.startsWith('<') && !emote2.startsWith(':')) {
			await interaction.reply('Sorry, choice 2 does not have a valid emote. Correct usage: :emote: Choice description.');
			return;
		}

		// CHECK EMOTES IN SERVER
		if (!emojis.has(emote1.replace(/\D/g, ''))) {
			await interaction.reply('Sorry, emote 1 is not in this server.');
			return;
		}
		if (!emojis.has(emote2.replace(/\D/g, ''))) {
			await interaction.reply('Sorry, emote 2 is not in this server.');
			return;
		}

		description += '\n' + emote1 + " - " + choice1;
		description += '\n' + emote2 + " - " + choice2;

		// ADD OPTIONAL CHOICES
		const option3 = interaction.options.getString('option3');
		const option4 = interaction.options.getString('option4');
		const option5 = interaction.options.getString('option5');
		var emote3;
		var emote4;
		var emote5;

		if (option3) {
			const choice3 = option3.substr(option3.indexOf(" ") + 1);
			emote3 = option3.split(" ")[0];
			description += '\n' + emote3 + " - " + choice3;

			// CHECK EMOTE 3
			if (!emote3.startsWith('<') && !emote3.startsWith(':')) {
				await interaction.reply('Sorry, choice 3 does not have a valid emote. Correct usage: :emote: Choice description.');
				return;
			}

			// CHECK EMOTE 3 IN SERVER
			if (!emojis.has(emote3.replace(/\D/g, ''))) {
				await interaction.reply('Sorry, emote 3 is not in this server.');
				return;
			}
		}

		if (option4) {
			const choice4 = option4.substr(option4.indexOf(" ") + 1);
			emote4 = option4.split(" ")[0];
			description += '\n' + emote4 + " - " + choice4;

			// CHECK EMOTE 4
			if (!emote4.startsWith('<') && !emote4.startsWith(':')) {
				await interaction.reply('Sorry, choice 4 does not have a valid emote. Correct usage: :emote: Choice description.');
				return;
			}

			// CHECK EMOTE 4 IN SERVER
			if (!emojis.has(emote4.replace(/\D/g, ''))) {
				await interaction.reply('Sorry, emote 4 is not in this server.');
				return;
			}
		}

		if (option5) {
			const choice5 = option5.substr(option5.indexOf(" ") + 1);
			emote5 = option5.split(" ")[0];
			description += '\n' + emote5 + " - " + choice5;

			// CHECK EMOTE 5
			if (!emote5.startsWith('<') && !emote5.startsWith(':')) {
				await interaction.reply('Sorry, choice 5 does not have a valid emote. Correct usage: :emote: Choice description.');
				return;
			}

			//CHECK EMOTE 5 IN SERVER
			if (!emojis.has(emote5.replace(/\D/g, ''))) {
				await interaction.reply('Sorry, emote 5 is not in this server.');
				return;
			}
		}

		// CREATE EMBED
		var pollEmbed = new MessageEmbed()
			.setColor('#FAB9C7')
			.setDescription(description);

		// SEND REPLY
		const pollReply = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });

		// REACT WITH EMOJI'S
		pollReply.react(emote1);
		pollReply.react(emote2);

		// ADD OPTIONAL REACTIONS
		if (option3) { pollReply.react(emote3) };
		if (option4) { pollReply.react(emote4) };
		if (option5) { pollReply.react(emote5) };
	},
};