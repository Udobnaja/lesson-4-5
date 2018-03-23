const merge = require('lodash/merge');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let config = require('./env/defaults');

if (process.env.NODE_ENV !== 'production') {
    let localConfig = {};

    try {
        localConfig = require(`./env/${config.env}`);
        localConfig = localConfig || {};
    } catch (err) {
        localConfig = {};
    }

    config = merge({}, config, localConfig);
}

module.exports = config;
