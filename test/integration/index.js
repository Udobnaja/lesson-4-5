const chai = require('chai');
const config = require('../../server/config');
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

    describe(`Default Branch: ${config.defaultBranch}`, () => {
        it('expected Default Branch class', function () {
            return this.browser
                .url('/')
                .isExisting('.branch-list__item_default')
                .then((exists) => assert.isTrue(exists, 'Default Branch exist'));
        });

        it(`Default Branch should be equal ${config.defaultBranch}`, function () {
            return this.browser
                .url('/')
                .getText('.branch-list__item_default .branch-list__link')
                .then((name) => {
                    return assert.equal(name, config.defaultBranch);
                });
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

