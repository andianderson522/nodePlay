var config = {
    local: {
        mode: 'local',
        port: 3000,
        level: 'debug'
    },
    staging: {
        mode: 'staging',
        port: 4000,
        level: 'info'
    },
    production: {
        mode: 'production',
        port: 5000,
        level: 'warn'
    }
};
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};