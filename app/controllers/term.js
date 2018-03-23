const exec = require('../utils/exec');
const renderError = require('../utils/renderError');
const config = require('../config');
const options = config.setting.exec.options;

exports.index = (req, res) => {
    res.render('term');
};

exports.execute_command = (req, res) => {
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