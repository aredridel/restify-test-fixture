restify-test-fixture
====================

A simple startup and teardown for tests using restify servers

Best used with [`with-fixtures`](https://npmjs.com/package/with-fixtures')

Use
----

```
const restifyFixture = require('restify-test-fixture');
const withFixtures = require('with-fixtures');

doSomeTest(async () => {
	const fixture = restifyFixture(server => {
		server.post('/path', handler);
	})
	await withFixtures([
		fixture
	], () => {
		const url = (await fixture).url
		// make request to url here
	});
})
```
