const renderError = require('../helpers/renderError');
const config = require('../config');
const {defaultBranch} = config;
const {getBranchList, getFormattedCommitList} = require('../api/index');

exports.renderBranchList = (req, res) => {
    getBranchList()
        .then((branches) => {
            res.render('branch-list',{
                branches,
                defaultBranch,
            });
        }).catch((error) => {
            renderError({res, router: 'branch-list', error});
        });
};

exports.renderBranchDetail = (req, res) => {
    getFormattedCommitList({branch: req.params.name})
        .then((commits) => {
            res.render('branch-detail', {
                commits,
                branch: req.params.name
            });
        })
        .catch((error) => {
            renderError({res, router: 'branch-detail', error});
        });
};
