const renderError = require('../utils/renderError');
const config = require('../config');
const options = config.setting.exec.options;
const exec = require('../utils/exec');
const buildHierarchy = require('../helpers/buildHierarchy');

exports.tree_list = (req, res) => {
    exec(`git ls-tree --name-only -r ${req.params.hash}`, options)
        .then((data) => {
            let files = data.split('\n');
            let tree = buildHierarchy(files, true);

            res.render('file-list', {
                tree
            })
        }).catch((error) => {
            renderError({res, router: 'file-list', error})
        })
};