const chai = require('chai');
const expect = chai.expect;
const buildFlatTree = require('../../app/helpers/buildFlatTree');
const stubPath = '/app/tree/branch/file.js';
const expectTree = {
    dir: '',
    children: [
        {
            dir: 'app',
            children: [
                {
                    dir: 'tree',
                    children: [
                        {
                            dir: 'branch',
                            children: [
                                {
                                    dir: 'file.js',
                                    children: null,
                                    parent: stubPath,
                                }
                            ],
                            parent: stubPath,
                        }
                    ],
                    parent: stubPath,
                }
            ],
            parent: stubPath,
        }
    ],
    parent: stubPath,
};

describe('buildFlatTree helper function', () => {
    it('Should return object with subdirectories and children from string path', () => {
        const tree = buildFlatTree(stubPath, stubPath);
        expect(tree).to.deep.include(expectTree);
    });
});
