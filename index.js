const promisify = require('es6-promisify-all');
const restify = require('restify');

module.exports = function restifyFixture(fn) {return __async(function*(){
	const server = restify.createServer()
	yield fn(server);
	promisify(server);
	yield server.listenAsync(0);
	return {
		done() {return __async(function*(){
		 	yield server.closeAsync()
			console.warn('closed');
		}())},
		url: server.url
	};
}())}

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a)}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d)}function d(e){c(e,1)}c()})}
