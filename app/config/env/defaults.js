const path = (process.env.NODE_ENV !== 'production') ? process.cwd() : process.cwd() + '/app/repo';

const config = {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    setting: {
        path,
        exec: {
            options: {
                cwd: path,
                maxBuffer: 200*1024
            }
        },
        date: {
            format: '%ar' /* /%ad, %aD, %aD, %at/*/
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
