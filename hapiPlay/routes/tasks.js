exports.register = function(server, options, next) {

	var tasks = [];

    server.route([
        {
            method: 'GET',
            path: '/tasks',
            handler: function (request, reply) {
				reply(tasks);
            }
        },
        {
            method: 'POST',
            path: '/tasks',
            handler: function (request, reply) {
                // Get the task
                var task = request.payload.task;
                // Let's store the task
                var key = tasks.push(task);
                reply({key: key - 1, task: task});
            }
        }
    ]);

    // Callback, completes the registration process
    next();
};

// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
    name: 'tasks-route', // Must be unique
    version: '1.0.0'
};
