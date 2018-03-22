const renderError = require('../utils/renderError');
const config = require('../config');
const options = config.setting.exec.options;
const exec = require('../utils/exec');

exports.blob_content = (req, res) => {
    exec(`git cat-file -p ${req.params.filename}`, options).then((body) => {
        res.render('blob', {
            body
        });
    }).catch((error) => {
        renderError({res, router: 'blob', error});
    });
};