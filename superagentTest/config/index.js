var config = {
    local: {
        mode: 'local',
        level: 'debug'
    },
    staging: {
        mode: 'staging',
        level: 'info'
    },
    production: {
        mode: 'production',
        level: 'warn'
    }
};
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};
