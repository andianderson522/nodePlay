var config = {
    local: {
        mode: 'local',
        level: 'debug',
        baseUrl: 'http://localhost:8080'
    },
    ci: {
        mode: 'ci',
        level: 'info',
        baseUrl: 'http://dev-user-service.condenastdigital.com'
    },
    staging: {
        mode: 'staging',
        level: 'info',
        baseUrl: 'https://stag-user-service.condenastdigital.com'
    },
    production: {
        mode: 'production',
        level: 'warn',
        baseUrl: 'https://user-service.condenastdigital.com'
    }
};
module.exports = function(mode) {
    return config[mode || process.argv[4] || 'ci'] || config.ci;
};
