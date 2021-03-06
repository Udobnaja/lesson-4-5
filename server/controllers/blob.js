const renderError = require('../helpers/renderError');
const config = require('../config');
const {getFileContent} = require('../utils/git/index');

exports.renderBlobContent = (req, res) => {
    let branch = req.params.branch;
    let breadcrumbs = (req.params[0]) ? req.params[0].split('/') : null;
    getFileContent({name: req.params.filename})
        .then((body) => {
            res.render('blob', {
                body,
                breadcrumbs,
                branch
            });

        }).catch((error) => {
            renderError({res, router: 'blob', error});
        });
};
