const promisify = require('es6-promisify-all');
const restify = require('restify');

module.exports = async function restifyFixture(fn) {
	const server = restify.createServer()
	await fn(server);
	promisify(server);
	await server.listenAsync(0);
	return {
		async done() {
		 	await server.closeAsync()
		},
		url: server.url
	};
}
