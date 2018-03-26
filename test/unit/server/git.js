const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const {catFile} = require('../../../server/api/git/index');
const {blobHash, blobContent} = require('../../fixtures/stubs');

describe('Get File Content via git command', () => {
    it('It should return string', () => {
        catFile({name: blobHash}).then((body) => {
            return assert.equal(body, blobContent);
        });

    });
});
