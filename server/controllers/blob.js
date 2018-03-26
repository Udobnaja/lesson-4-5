const renderError = require('../helpers/renderError');
const config = require('../config');
const options = config.setting.exec.options;
const exec = require('../utils/child_process/exec');

exports.renderBlobContent = (req, res) => {
    let branch = req.params.branch;
    let breadcrumbs = (req.params[0]) ? req.params[0].split('/') : null;
    exec(`git cat-file -p ${req.params.filename}`, options).then((body) => {
        res.render('blob', {
            body,
            breadcrumbs,
            branch
        });
    }).catch((error) => {
        renderError({res, router: 'blob', error});
    });
};
