module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.channel) {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		}
		else {
			console.log(`${interaction.user.tag} triggered an interaction.`);
        }
	},
};