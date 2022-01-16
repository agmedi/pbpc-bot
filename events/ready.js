module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		// CONSOLE READY MESSAGE
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// CLIENT STATUS
		client.user.setActivity("plump's corner", { type: 'WATCHING' });
	},
};