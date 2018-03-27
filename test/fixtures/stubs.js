const stubs = {
    blobHash: '39076ea17a42f8747bddd7a7702c393177ef390b',
    blobContent: 'PORT=\nSECRET_KEY=',
    stubHash: '415c4ecfcb85ceeee4d086cc60e88b0fcf2e3061',
    stubCommitInfo: `
       Author: udobnaja 
       Date: 14 hours ago 
       Commit message: убрать из докер образа тесты`,
    stubFolder: 'client',
    stubFolderContent: ['images', 'index.js', 'sass'],
    stubPathToFile: '/app/tree/branch/file.js',
    expectTree: {
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
                                        parent: '/app/tree/branch/file.js',
                                    }
                                ],
                                parent: '/app/tree/branch/file.js',
                            }
                        ],
                        parent: '/app/tree/branch/file.js',
                    }
                ],
                parent: '/app/tree/branch/file.js',
            }
        ],
        parent: '/app/tree/branch/file.js',
    }
};

module.exports = stubs;
