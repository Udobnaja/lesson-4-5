const chai = require('chai');
const {defaultBranch, host, port} = require('../../server/config');
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

    describe(`Default Branch: ${defaultBranch}`, () => {
        it('expected Default Branch class', function () {
            return this.browser
                .url('/')
                .isExisting('.branch-list__item_default')
                .then((exists) => assert.isTrue(exists, 'Default Branch exist'));
        });

        it(`Default Branch should be equal ${defaultBranch}`, function () {
            return this.browser
                .url('/')
                .getText('.branch-list__item_default .branch-list__link')
                .then((name) => assert.equal(name, defaultBranch));
        });
    });
});

describe(`Router /branch/${defaultBranch}`, () => {
    it('Click on the hash redirect to commit files structure', async function () {
        let element = this.browser
            .url(`/branch/${defaultBranch}`)
            .$('.list__item')
            .$('a');
        let hash = '';

        return element.getText().then((text) => {
            hash = text;
            return element;
        }).click()
            .getUrl()
            .then((url) => assert.equal(url, `http://${host}:${port}/ls-tree/${hash}`));
    });

});
//
// describe('Router /ls-tree/:branch', () => {
//
// });
//
//
// describe('Router /blob/:branch/(*/)?:filename', () => {
//
// });

