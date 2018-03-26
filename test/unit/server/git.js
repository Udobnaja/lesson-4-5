const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const {getFileContent} = require('../../../server/api/index');
const {blobHash, blobContent} = require('../../fixtures/stubs');

describe('Get File Content via git command', () => {
    it('It should return string', () => {
        getFileContent({name: blobHash}).then((body) => {
            return assert.equal(body, blobContent);
        });

    });
});
