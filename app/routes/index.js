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

            // promise with finally will be sexy
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

const SEPARATOR = Math.random()*10e8;

indexRouter.route('/branch/:name')
    .get((req, res) => {

        Exec(`git checkout ${req.params.name}`, options)
            .then(()=> {
            /* тут можно вставить формат даты ? в надежде что он валидный */
                return Exec(`
                git log --pretty=format:'{
                    "hash":"%h",
                    "author":"%an",
                    "date":"%ar",
                    "body":"%s"} ${SEPARATOR}'`, options);

            }).then((log) => {
            /* JSON */
               let chunk = log.split(SEPARATOR);
               let commits = [];

               for (let stringObject of chunk){
                   if (stringObject.length === 0) continue;
                   let object;
                   try {
                       object = JSON.parse(stringObject);
                   } catch(e) {
                       let strings = stringObject.match(/".*":".*"/g);
                       let newObject = {};
                       for (let str of strings){
                           let position = str.indexOf(':');

                           let key = str.slice(1, position - 1);
                           let value = str.slice(position + 2, str.length - 1);
                           newObject[key] = value;
                       }
                       object = newObject;
                   }
                   commits.push(object);
               }


                res.render('branch-detail', {
                    commits
                })
            })
            .catch((error) => {
                renderErrorPage({res, router: 'branch-detail', error})
            })
    });

indexRouter.route('/commit/:hash').get((req, res) => {
    Exec(`git ls-tree --name-only -r ${req.params.hash}`, options)
        .then((data) => {
            let files = data.split('\n');
            res.render('file-list', {
                files
            })
        }).catch((error) => {
            renderErrorPage({res, router: 'file-list', error})
        })
});

module.exports = indexRouter;