const renderError = require('../helpers/renderError');
const config = require('../config');
const {defaultBranch} = config;
const options = config.setting.exec.options;
const readDir = require('../utils/fs/readdir');
const exec = require('../utils/child_process/exec');
const {getBranchList} = require('../api/index');

exports.renderBranchList = (req, res) => {
    getBranchList()
        .then((branches) => {
            res.render('branch-list',{
                branches,
                defaultBranch,
            });
        }).catch((error) => {
            renderError({res, router: 'branch-list', error});
        });
};

exports.renderBranchDetail = (req, res) => {
    exec(`git log ${req.params.name} --pretty=format:'%H'`, options)
        .then((log) => {
            const hashes = log.split('\n');
            const promises = [];

            for (let hash of hashes) {
                promises.push(
                    new Promise((resolve, reject) => {
                        exec(`git show --quiet --pretty=' 
                                Author: %an 
                                Date: %ar 
                                Commit message: %s' ${hash}`, options)
                            .then((info) => {
                                resolve({hash, info});
                            })
                            .catch(reject);
                    }));
            }

            Promise.all([...promises]).then((commits) => {
                res.render('branch-detail', {
                    commits,
                    branch: req.params.name
                });
            }).catch((error) => {
                renderError({res, router: 'branch-detail', error});
            });
        })
        .catch((error) => {
            renderError({res, router: 'branch-detail', error});
        });
};
