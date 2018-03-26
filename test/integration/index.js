const chai = require('chai');
const {defaultBranch, host, port} = require('../../server/config');
const assert = chai.assert;

const {blobHash, blobContent, stubHash, stubFolder, stubFolderContent} = require('../fixtures/stubs');

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

    it('Click on the Folder redirect to inner layout', function () {
        let element = this.browser
            .url(`/ls-tree/${stubHash}`)
            .$('.tree-list__item-folder');
        let folder = '';

        return element
            .getText()
            .then((text) => {
                folder = text;
                return element;
            })
            .click()
            .getUrl()
            .then((url) => assert.equal(url, `http://${host}:${port}/ls-tree/${stubHash}/${folder}`));
    });

    it('Should return Folder Structure', function () {
        return this.browser
            .url(`/ls-tree/${stubHash}/${stubFolder}`)
            .isExisting('.tree-list')
            .then((exists) => assert.isTrue(exists, 'Folder Structure Exists'));
    });

    it('Correct Sub Folder Content', function () {
        return this.browser
            .url(`/ls-tree/${stubHash}/${stubFolder}`)
            .getText('.list__link')
            .then((items) => assert.deepEqual(items, stubFolderContent, 'Contents are equal'));
    });

    it('Click on the the breadcrumb return to dir', function () {
        return this.browser
            .url(`/ls-tree/${stubHash}/${stubFolder}`)
            .$('.breadcrumbs')
            .$('a')
            .click()
            .getUrl()
            .then((url) => assert.equal(url, `http://${host}:${port}/ls-tree/${stubHash}/`));
    });


    it('Click on the File redirect to this File Page', function () {
        let element = this.browser
            .url(`/ls-tree/${stubHash}`)
            .$('.tree-list__item-blob');

        let href = '';

        return element
            .getAttribute('href')
            .then((h) => {
                href = h;
                return element;
            })
            .click()
            .getUrl()
            .then((url) => assert.equal(url, href));
    });

    it('Expected Blob content exist', function () {
        return this.browser
            .url(`/blob/${stubHash}/${blobHash}`)
            .isExisting('.blob')
            .then((exists) => assert.isTrue(exists, 'Blob file exist'));
    });

    it('Correct Blob content', function () {
        return this.browser
            .url(`/blob/${stubHash}/${blobHash}`)
            .$('.blob')
            .getText()
            .then((text) => assert.equal(text,blobContent));
    });


});


