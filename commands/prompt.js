const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prompt')
		.setDescription('Gives you a creative prompt')
		.addIntegerOption(option => option.setName('number').setDescription('Give a number if you want multiple prompts')),
	async execute(client, interaction) {
		// GET PROMPT
		const promptData = fs.readFileSync('./prompts.txt', 'utf-8');
		const prompts = promptData.split('\n');
		var prompt = prompts[Math.floor(Math.random() * prompts.length)]

		// MULTIPLE PROMPTS
		const number = interaction.options.getInteger('number');
		if (number) {
			for (let i = 1; i < number; i++) {
				prompt += prompts[Math.floor(Math.random() * prompts.length)]
            }
        }

		await interaction.reply(prompt);
	},
};