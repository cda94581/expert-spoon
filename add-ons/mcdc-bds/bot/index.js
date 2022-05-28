const gamertags = require('./GTID.json');
const { channel, token, webhookID, webhookToken, port } = require('./config.json');
let messages = [];

// Setup Bot
const Discord = require('discord.js');
const client = new Discord.Client({ partials: [ 'MESSAGE', 'USER' ], intents: [ 'GUILDS', 'GUILD_MESSAGES' ]});
const webhook = new Discord.WebhookClient({ id: webhookID, token: webhookToken }, { allowedMentions: { parse: [] }});
client.once('ready', () => console.log('Bot Ready'));
client.login(token);

// Setup Webserver
const http = require('http');
const server = http.createServer();
server.listen(port);

// Processing
server.on('request', (req, res) => {
	const { method, url } = req;
	let responseString = '';
	res.setHeader('Content-Type', 'text/plain');
	let body = [];
	req.on('data', d => body.push(d)).on('end', async () => {
		try { body = JSON.parse(Buffer.concat(body).toString()); } catch {}

		if (url == '/mcdc/send' && method == 'POST') {
			res.statusCode = 200;
			let avatar = null;
			try {
				const user = await client.users.fetch(gamertags[body.name]);
				avatar = user.displayAvatarURL();
			} catch {}
			webhook.send({
				username: body.name,
				avatarURL: avatar,
				content: body.message
			});
		}
		else if (url == '/mcdc/fetch' && method == 'GET' && messages.length) {
			res.statusCode = 200;
			responseString = JSON.stringify(messages);
			messages = [];
		}
		else res.statusCode = 400;
		res.end(responseString);
	});
});

client.on('messageCreate', message => {
	if (message.author.bot && message.author.id == webhookID) return;
	if (!message.cleanContent || message.channel.id != channel) return;
	messages.push({
		name: message.member.displayName,
		user: message.author.tag,
		message: message.cleanContent
	});
});

console.log('Server Ready');