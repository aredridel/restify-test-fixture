const promisify = require('es6-promisify');
const restify = require('restify');

module.exports = async function restifyFixture(fn) {
	const server = restify.createServer()
	await fn(server);
	const listen = promisify(server.listen, server);
	const close = promisify(server.close, server);
	await listen(0);
	return {
		async done() {
		 	await close();
		},
		url: server.url
	};
}
