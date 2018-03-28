const repoPath = process.env.REPO_PATH;
const path = process.cwd();
const cwd = (repoPath) ? path + repoPath : path;
const git = '.git/';

const config = {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    defaultBranch: 'master',
    local: false,
    setting: {
        path,
        git,
        exec: {
            options: {
                cwd,
                maxBuffer: 200*1024
            }
        },
    },
    logger: {
        level: 'info',
        format: 'tiny'
    }
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.env = process.env.NODE_ENV;

module.exports = config;
