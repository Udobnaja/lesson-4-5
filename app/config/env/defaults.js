const isProduction = (process.env.NODE_ENV === 'production');
const path = process.cwd();
const cwd = (process.env.REPO_PATH) ? process.cwd() + process.env.REPO_PATH : process.cwd();
const git = (process.env.REPO_PATH) ? '': '.git/';

const config = {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    setting: {
        path,
        git,
        exec: {
            options: {
                cwd,
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
