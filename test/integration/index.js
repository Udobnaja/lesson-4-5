const chai = require('chai');
const assert = chai.assert;
//
describe('Router / or /branch', () => {
    it('expected content of Page Title', function () {
        return this.browser
            .url('/')
            .getTitle()
            .then((title) => {
                return assert.equal(title, 'Test Your Local Git');
            });
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

