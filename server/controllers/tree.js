const renderError = require('../helpers/renderError');
const config = require('../config');
const options = config.setting.exec.options;
const exec = require('../utils/child_process/exec');
const buildHierarchy = require('../helpers/buildHierarchy');

exports.renderTree = (req, res) => {
    exec(`git ls-tree --name-only -r ${req.params.hash}`, options)
        .then((data) => {
            let files = data.split('\n');
            let tree = buildHierarchy(files, true);

            res.render('tree', {
                tree
            });
        }).catch((error) => {
            renderError({res, router: 'tree', error});
        });
};
