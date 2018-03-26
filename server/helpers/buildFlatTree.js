const path = require('path');

const createBranch = ({dir, children, parent}) => {
    return {dir, children, parent};
};

const buildFlatTree = (string, parent) => {
    let pos = string.indexOf(path.sep);
    if (pos > -1) {
        return createBranch({
            dir: string.slice(0, pos),
            children: [buildFlatTree(string.slice(pos + 1), parent)],
            parent
        });
    } else {
        return createBranch({dir: string, children: null, parent});
    }
};

module.exports = buildFlatTree;
