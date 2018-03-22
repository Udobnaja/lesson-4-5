const buildFlatTree = require('./buildFlatTree');

const createBranch = ({hierarchy, dir, parent}) => {
    let children = buildHierarchy(hierarchy[dir]);
    let type = (children !== undefined) ? 'dir' : 'file';
    return {dir, children, type, parent};
};

const buildHierarchy = (branches, isRoot = false) => {
    let hierarchy = {};
    let currentDir = null;
    let childrenHierarchy = [];
    let index = 0;

    for (let branch of branches) {
        index++;
        let { dir, children, parent } = isRoot ? buildFlatTree(branch, branch) : branch;

        if (!hierarchy[dir]) {
            hierarchy[dir] = [];


            if (currentDir !== null && currentDir !== dir) {
                childrenHierarchy.push(createBranch({hierarchy, dir: currentDir, parent}));
            }

            currentDir = dir;
        }

        if (children) {
            hierarchy[dir].push(...children);
        }

        if (index === branches.length){
            childrenHierarchy.push(createBranch({hierarchy, dir: currentDir, parent}));
            return childrenHierarchy;
        }
    }
};

module.exports = buildHierarchy;