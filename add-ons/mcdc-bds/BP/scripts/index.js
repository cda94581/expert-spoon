import { world } from 'mojang-minecraft';
import { http, HttpRequest, HttpRequestMethod } from 'mojang-net';
const host = 'http://localhost:49152';

world.events.chat.subscribe(evd => {
	const { message, sender } = evd;
	const request = new HttpRequest(`${host}/mcdc/send`)
		.setBody(JSON.stringify({
			name: sender.name,
			message
		}))
		.setMethod(HttpRequestMethod.POST);
	http.request(request).catch(err => console.warn(err));
});

world.events.tick.subscribe(evd => {
	if (evd.currentTick % 20 != 0) return;
	const request = new HttpRequest(`${host}/mcdc/fetch`).setMethod(HttpRequestMethod.GET);

	http.request(request).then(res => {
		if (res.status == 400) return;
		const body = JSON.parse(res.body);
		body.forEach(message => world.getDimension('overworld').runCommand(`tellraw @a { "rawtext": [{ "text": "<${message.name}> (${message.user}) ${message.message}" }]}`));
	});
});