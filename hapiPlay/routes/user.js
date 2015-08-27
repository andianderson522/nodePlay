exports.register = function(server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/user/{uuid}',
            handler: function (request, reply) {
				reply(encodeURIComponent(request.params.uuid));
            }
        }

    ]);
    next();

};

exports.register.attributes = {
    name: 'user-route', // Must be unique
    version: '1.0.0'
};
