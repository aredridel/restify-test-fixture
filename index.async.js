const promisify = require('es6-promisify');
const restify = require('restify');
const url = require('url');

module.exports = async function restifyFixture(fn) {
	const server = restify.createServer()
	await fn(server);
	const listen = promisify(server.listen, server);
	const close = promisify(server.close, server);
	await listen(0);

	const u = url.parse(server.url);
	delete u.host;
	u.hostname = 'localhost'
	return {
		async done() {
		 	await close();
		},
		url: url.format(u)
	};
}
