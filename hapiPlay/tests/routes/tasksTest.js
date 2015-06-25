var chai = require('chai'),
	assert = chai.assert,
	hapi = require('hapi'),
	sinon = require('sinon');

	describe("stub test", function() {
		 before(function () {
			server = new hapi.Server();
			done = sinon.spy();
			server.connection();
			server.route = sinon.spy();
			next = sinon.spy();
			tasks = require('../../routes/tasks.js');
	    });
		it('test setup', function() {
			assert.isNotNull(tasks);
			assert.isNotNull(tasks.register);
			assert.isFunction(tasks.register);
			tasks.register(server,{}, next);
			assert.isTrue(next.called);
			assert.isTrue(server.route.called);
			assert.isTrue(server.route.calledBefore(next));
			attributes = tasks.register.attributes;
			assert.isNotNull(attributes);
			assert.equal(attributes.name, 'tasks-route');
			assert.equal(attributes.version, '1.0.0');
		});
	});
