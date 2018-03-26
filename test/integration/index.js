const chai = require('chai');
const assert = chai.assert;
//
describe('Router / or /branch', () => {
    it('expected content of Page Title', function () {
        return this.browser
            .url('/')
            .getTitle()
            .then((title) => assert.equal(title, 'Test Your Local Git'));
    });

    it('expected Branch List', function () {
        return this.browser
            .url('/')
            .isExisting('.list.branch-list')
            .then((exists) => assert.isTrue(exists, 'Branch list exist'));
    });
});
//
// describe('Router /branch:name', () => {
//
// });
//
// describe('Router /ls-tree/:branch', () => {
//
// });
//
//
// describe('Router /blob/:branch/(*/)?:filename', () => {
//
// });

