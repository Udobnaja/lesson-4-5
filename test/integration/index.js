const chai = require('chai');
const {defaultBranch, host, port} = require('../../server/config');
const assert = chai.assert;

const {blobHash, blobContent, stubHash, stubFolder, stubFolderContent} = require('../fixtures/stubs');

describe('Страница / или /branch', () => {
    it('Загаловок сраницы должен соотвествовать "Test Your Local Git"', function () {
        return this.browser
            .url('/')
            .getTitle()
            .then((title) => assert.equal(title, 'Test Your Local Git'));
    });

    it('На странице должен отображаться список веток', function () {
        return this.browser
            .url('/')
            .isExisting('.list.branch-list')
            .then((exists) => assert.isTrue(exists, 'Список веток не отобразился'));
    });

    describe(`Работа с веткой по умолчанию: ${defaultBranch}`, () => {
        it('На странице должна отображаться ветка по умолчанию', function () {
            return this.browser
                .url('/')
                .isExisting('.branch-list__item_default')
                .then((exists) => assert.isTrue(exists, 'На странице нет ветки по умолчанию'));
        });

        it(`Название ветки по умолчанию должно быть - ${defaultBranch}`, function () {
            return this.browser
                .url('/')
                .getText('.branch-list__item_default .branch-list__link')
                .then((name) => assert.equal(name, defaultBranch));
        });

        it('Ветка по умолчанию должна отображаться первой в списке', function () {
            return this.browser
                .url('/')
                .$('.branch-list__link')
                .getText()
                .then((name) => assert.equal(name, defaultBranch));
        });

        it('По клику на ветку происходит редирект на страницу коммитов ветки', function () {
            let element = this.browser
                .url('/')
                .$('.branch-list__link');

            let branchName = '';

            return element
                .getText()
                .then((name) => {
                    branchName = name;
                    return element;
                })
                .click()
                .getUrl()
                .then((url) => assert.equal(url, `http://${host}:${port}/branch/${branchName}`));
        });

        it('По клику на кнопку Browse Files происходит редирект на страницу файловой сруктуры коммита', function () {
            let element = this.browser
                .url('/')
                .$('.button');

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
    });
});

describe('Страница /branch/:defaultBranch', () => {

    it('По клику на хеш коммита - происходит редирект на страницу с файловой структурой', function () {
        let element = this.browser
            .url(`/branch/${defaultBranch}`)
            .$('.list__item')
            .$('a');

        let hash = '';

        return element.getText().then((text) => {
            hash = text;
            return element;
        })
            .click()
            .getUrl()
            .then((url) => assert.equal(url, `http://${host}:${port}/ls-tree/${hash}`));
    });
});

describe('Страница /ls-tree/:hash/(*вложенные папки)?', () => {

    it('Клик по файлу редиректит на страницу с содержанием файла', function () {
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

    it('Клик по папке редиректит во внутрь папки', function () {
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

    it('На странице должен быть список с файловой структурой', function () {
        return this.browser
            .url('/ls-tree/:hash/:folder')
            .isExisting('.tree-list')
            .then((exists) => assert.isTrue(exists, 'Файловой структуры нет на странице'));
    });

    it('В директории  /ls-tree/:hash/:folder содержится ожидаемый контент', function () {
        return this.browser
            .url(`/ls-tree/${stubHash}/${stubFolder}`)
            .getText('.list__link')
            .then((items) => assert.deepEqual(items, stubFolderContent, 'Контент папки не соотвествует ожидаемому'));
    });

    it('На странице с поддиректорией должны отображаться хлебные крошки', function () {
        return this.browser
            .url(`/ls-tree/${stubHash}/${stubFolder}`)
            .isExisting('.breadcrumbs')
            .then((exists) => assert.isTrue(exists, 'Хлебные крошки не отобразились'));
    });

    it('Клик по элементу breadcrumb возращает в дирректорию, на которую был произведен клик', function () {
        return this.browser
            .url(`/ls-tree/${stubHash}/${stubFolder}`)
            .$('.breadcrumbs')
            .$('a')
            .click()
            .getUrl()
            .then((url) => assert.equal(url, `http://${host}:${port}/ls-tree/${stubHash}/`));
    });

});

describe('Страница /blob/:hash/:file-hash', () => {
    it('На странице должен отображаться контент файла', function () {
        return this.browser
            .url(`/blob/${stubHash}/${blobHash}`)
            .isExisting('.blob')
            .then((exists) => assert.isTrue(exists, 'Контент файла не отображается'));
    });

    it('Контент файла должен соотвествовать ожидаемому', function () {
        return this.browser
            .url(`/blob/${stubHash}/${blobHash}`)
            .$('.blob')
            .getText()
            .then((text) => assert.equal(text,blobContent));
    });

    it('На странице с файлом должны отображаться хлебные крошки', function () {
        return this.browser
            .url(`/blob/${stubHash}/${blobHash}`)
            .isExisting('.breadcrumbs')
            .then((exists) => assert.isTrue(exists, 'Хлебные крошки не отобразились'));
    });
});


