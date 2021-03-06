const renderError = require('../helpers/renderError');
const config = require('../config');
const {defaultBranch} = config;
const {getBranchList, getFormattedCommitList} = require('../utils/git/index');

exports.renderBranchList = (req, res) => {
    getBranchList()
        .then((branches) => {
            const index = branches.findIndex((branch) => branch === defaultBranch);
            if (index !== -1 && branches.length !== 1) {
                let b = branches[index];
                branches.splice(index, 1);
                branches.splice(0, 0, b);
            }
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
