const express = require('express');
const indexRouter = express.Router();
const config = require('../config');
const exec = require('child_process').exec;
const options = config.setting.repo.options;
const {promisify} = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);
const stream = require('stream');
const path = require('path');

// SHOULD IT BE LOGIC AND CONTROLLER

const Exec = (command, options) => new Promise((resolve, reject) => {
    exec(command, options,  (err, stdout, stderr) => {
        if (err) return reject(err);
        resolve(stdout);
    })
});

const renderErrorPage = ({res, router, error}) => {
    res.render(router, {
        error
    });
};

indexRouter
    .route('/')
    .all((req, res) => {
        res.redirect('branch');
    });

indexRouter
    .route('/term')
        .get((req, res) => {
            res.render('term', {
                data: null,
                errors: null
            });
        })
        .post((req, res) => {
            //
            // DO SOMETHING IF PATH NOT FOUND
            //
            Exec(req.body.command, options)
                .then((data)=> {
                    res.render('term', {
                        data
                    });
                }).catch((error) => {
                    renderErrorPage({res, router: 'term', error});
                });
});

indexRouter.route('/branch')
    .get((req, res) => {
        readDirAsync(`${options.cwd}/.git/refs/heads/`)
            .then((branches) => {
                res.render('branch-list',{
                   branches
                });
            }).catch((error) => {
                renderErrorPage({res, router: 'branch-list', error})
            });
    });

indexRouter.route('/branch/:name')
    .get((req, res) => {

        Exec(`git log ${req.params.name} --pretty=format:'%H'`, options)
            .then((log) => {
                const hashes = log.split('\n');
                const promises = [];

                for (let hash of hashes){
                    promises.push(
                        new Promise((resolve, reject) => {
                            Exec(`git show --quiet --pretty='%n Author: %an %n Date: %ar %n Commit message: %s' ${hash}`)
                                .then((info) => {
                                    resolve({hash, info});
                                })
                                .catch(reject)
                        }));
                }

                Promise.all([...promises]).then((commits) => {
                    res.render('branch-detail', {
                        commits
                    });
                }).catch((error) => {
                    renderErrorPage({res, router: 'branch-detail', error})
                });


            })
            .catch((error) => {
                renderErrorPage({res, router: 'branch-detail', error})
            })
    });

indexRouter.route('/tree/:hash').get((req, res) => {
    Exec(`git ls-tree --name-only -r ${req.params.hash}`, options)
        .then((data) => {
            let files = data.split('\n');

            const buildFlatTree = (string, parent) => {
                let pos = string.indexOf(path.sep);
                if (pos > -1){
                    return {
                        dir: string.slice(0, pos),
                        children: [buildFlatTree(string.slice(pos + 1), parent)],
                        parent
                    };
                } else {
                    return {
                        dir: string,
                        children: null,
                        parent
                    }
                }
            };

            // TODO: выводить type директория или файл а так же полный путь для просмотра файла

            const buildHierarchy = (branches, isRoot = false) => {
                let hierarchy = {};
                let currentDir = null;
                let childrenHierarchy = [];
                let index = 0;

                for (let branch of branches) {
                    index++;
                    let { dir, children, type, parent } = isRoot ? buildFlatTree(branch, branch) : branch;

                    if (!hierarchy[dir]) {
                        hierarchy[dir] = [];

                        if (currentDir && currentDir !== dir) {
                            let c = buildHierarchy(hierarchy[currentDir]);
                            childrenHierarchy.push({dir: currentDir, children: c, type : c ? 'dir' : 'file', parent});
                        }

                        currentDir = dir;
                    }

                    if (children) {
                        hierarchy[dir].push(...children);
                    }

                    if (index === branches.length){
                        let c = buildHierarchy(hierarchy[currentDir]);
                        childrenHierarchy.push({dir: currentDir, children: c, type : c ? 'dir' : 'file', parent});
                        return childrenHierarchy;
                    }
                }
            };

            // TODO: последняя строка пустая - чистить

            let tree = buildHierarchy(files, true);

            res.render('file-list', {
                tree
            })
        }).catch((error) => {
            renderErrorPage({res, router: 'file-list', error})
        })
});

module.exports = indexRouter;