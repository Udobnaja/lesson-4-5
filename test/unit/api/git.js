const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const {getFileContent, getBranchList} = require('../../../server/api/index');
const {blobHash, blobContent} = require('../../fixtures/stubs');

describe('Get File Content via git command', () => {
    it('It should return string with file content', () => {
        getFileContent({name: blobHash}).then((body) => {
            return assert.equal(body, blobContent);
        }).catch(e => e);
    });
});

describe('Get Branch List', () => {
    it('It should return array', () => {
        getBranchList().then((list) => {
            return assert.isArray(list, 'Branch list');
        }).catch((e) => e);
    });
});
