const config = {
    port:  process.env.PORT || 3000,
    setting: {
        repo: {
            path: ''
        },
        date: {
            format: ''
        }
    },
    logger: {
        level: 'info',
        format: 'tiny'
    }
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.env = process.env.NODE_ENV;

module.exports = config;