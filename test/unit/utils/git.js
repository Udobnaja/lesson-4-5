const chai = require('chai');
const {assert, expect} = require('chai');
chai.use(require('chai-as-promised'));
const {
    getFileContent,
    getBranchList,
    getCommitInfo,
    getFilesStructure,
    getFormattedCommitList
} = require('../../../server/utils/git/index');
const {
    blobHash,
    blobContent,
    stubHash,
    stubCommitInfo,
    stubFolder,
    stubFolderContent
} = require('../../fixtures/stubs');

describe('Получение контента файла с помощью git команды cat-file', () => {
    it('Доджна возвращать контент файла в виде строки, соответствующий заглушке', async () => {
        const content = await getFileContent({name: blobHash});
        assert.equal(content, blobContent);
    });
});

describe('Получение списка веток', () => {
    it('Должен возвращаться массив', async () => {
        const list = await getBranchList();
        assert.isArray(list, 'Массив веток репозитория');
    });
});

describe('Получение информации о коммите по хешу', () => {
    it('Должен возвращать строку с информацией об авторе идентичной заглушке', async () => {
        const info = await getCommitInfo({hash: stubHash});
        assert.equal(info.split('\n')[1].trim(), stubCommitInfo.split('\n')[1].trim()); // потому что даты разные будут
    });

    it('Должен возвращать ошибку, если такого хеша нет', async () => {
        await getCommitInfo({hash: 'this_is_not_a_hash'}).should.be.rejectedWith(Error);
    });
});

describe('Получение файловой структуры', () => {
    it('Должен возвращать массив с именами файлов/папок ', async () => {
        const structure = await getFilesStructure({path: `${stubHash}:./${stubFolder}`});
        assert.deepEqual(structure.map(e => e.name), stubFolderContent);
    });

    it('Должен возвращать ошибку, если такого пути нет', () => {
        getFilesStructure({path: 'not_a_path_at_all'}).then().catch((e) => {
            expect(e).to.throw();
        });

    });
});

describe('Получение списка отформатированных комитов (getFormattedCommitList)', () => {
    it('Должен возвращать Promise если такая ветка есть ', async () => {
        await getFormattedCommitList({branch: 'master'}).should.be.fulfilled;
    });

    it('Должен возвращать ошибку, если такой ветки нет', async () => {
        await getFormattedCommitList({branch: 'not_a_branch'}).should.be.rejectedWith(Error);
    });
});
