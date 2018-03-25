const exec = require('../utils/child_process/exec');
const renderError = require('../helpers/renderError');
const config = require('../config');
const options = config.setting.exec.options;

exports.index = (req, res) => {
    res.render('term');
};

exports.executeCommand = (req, res) => {
    exec(req.body.command, options)
        .then((data)=> {
            res.render('term', {
                data
            });
        })
        .catch((error) => {
            renderError({res, router: 'term', error});
        });
};
