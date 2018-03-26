const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const {
    getFileContent,
    getBranchList,
    getCommitsListHash,
    getCommitInfo,
    getFormattedCommitList
} = require('../../../server/api/index');
const {blobHash, blobContent, stubHash, stubCommitInfo} = require('../../fixtures/stubs');

const stringFormatter = (string) => {
    return string.split('\n').join(' ').trim();
};

describe('Get File Content via git command', () => {
    it('It should return string with file content', async () => {
        const content = await getFileContent({name: blobHash});
        assert.equal(content, blobContent);
    });
});

describe('Get Branch List', () => {
    it('It should return array', async () => {
        const list = await getBranchList();
        assert.isArray(list, 'Branch list');
    });
});

describe('Get Commit Info by hash', () => {
    it('it should return string with correct information', async () => {
        const info = await getCommitInfo({hash: stubHash});
        assert.equal(info.split('\n')[1].trim(), stubCommitInfo.split('\n')[1].trim()); // потому что даты разные будут
    });
});
