const renderError = require('../utils/renderError');
const config = require('../config');
const options = config.setting.exec.options;
const readDir = require('../utils/readDir');
const exec = require('../utils/exec');

exports.branch_list = (req, res) => {
    readDir(`${options.cwd}/.git/refs/heads/`)
        .then((branches) => {
            res.render('branch-list',{
                branches
            });
        }).catch((error) => {
            renderError({res, router: 'branch-list', error})
    });
};

exports.branch_detail = (req, res) => {
    exec(`git log ${req.params.name} --pretty=format:'%H'`, options)
        .then((log) => {
            const hashes = log.split('\n');
            const promises = [];

            for (let hash of hashes){
                promises.push(
                    new Promise((resolve, reject) => {
                        exec(`git show --quiet --pretty='%n Author: %an %n Date: ${config.setting.date.format} %n Commit message: %s' ${hash}`, options)
                            .then((info) => {
                                resolve({hash, info});
                            })
                            .catch(reject)
                        }));
            }

            Promise.all([...promises]).then((commits) => {
                res.render('branch-detail', {
                    commits,
                    branch: req.params.name
                });
            }).catch((error) => {
                renderError({res, router: 'branch-detail', error})
            });
        })
        .catch((error) => {
            renderError({res, router: 'branch-detail', error})
        })
};