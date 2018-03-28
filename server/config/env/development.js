const config = {
    local: !process.env.REMOTE,
    logger: {
        level: 'debug',
        format: 'combined'
    }
};

module.exports = config;
