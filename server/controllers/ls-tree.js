const renderError = require('../helpers/renderError');
const config = require('../config');
const options = config.setting.exec.options;
const exec = require('../utils/child_process/exec');
const {getFilesStructure} = require('../api/index');

exports.renderLsTree = (req, res) => {
    let isTop = req.path.length === 1;
    let [path, subdir] = (isTop) ? [req.path, ''] : [req.path + '/', ':.' + req.path];
    let pos = req.path.lastIndexOf('/');
    let breadcrumbs = (pos !== -1 && !isTop) ? req.path.slice(1, pos).split('/') : null;

    getFilesStructure({path: req.params.branch + subdir})
        .then((files) => {
            res.render('ls-tree', {
                files,
                branch: req.params.branch,
                path,
                breadcrumbs
            });
        }).catch((error) => {
            renderError({res, router: 'ls-tree', error});
        });
};
