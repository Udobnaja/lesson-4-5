const isProduction = (process.env.NODE_ENV === 'production');
const processCWD = process.cwd();
const path = (process.env.REPO_PATH) ? processCWD + process.env.REPO_PATH : processCWD;
const git = isProduction ? '' : '.git/';

const config = {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    setting: {
        path,
        git,
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
