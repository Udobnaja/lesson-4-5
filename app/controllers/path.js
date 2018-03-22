const renderError = require('../utils/renderError');
const config = require('../config');
const options = config.setting.exec.options;
const exec = require('../utils/exec');


exports.show_dir = (req, res) => {
    let isTop = req.path.length === 1;
    let [path, subdir] = (isTop) ? [req.path, ''] : [req.path + '/', ':.' + req.path];
    let pos = req.path.lastIndexOf('/');
    let breadcrumbs = (pos !== -1 && !isTop) ? req.path.slice(1, pos).split('/') : null;

    exec(`git ls-tree ${req.params.branch}${subdir} | awk '{print $2} {print $3} {print $4}'`, options)
        .then((objects) => {

            let structure = objects.split('\n');

            let files = [];

            for (let i = 0; i < structure.length; i += 3){
                files.push({type: structure[i], hash: structure[i + 1], name: structure[i + 2]});
            }

            files.pop();


            res.render('file-list', {
                files: files,
                branch: req.params.branch,
                path,
                breadcrumbs
            });

        }).catch((error) => {
            renderError({res, router: 'file-list', error})
        });
};