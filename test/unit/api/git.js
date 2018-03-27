const {assert} = require('chai');
const {
    getFileContent,
    getBranchList,
    getCommitInfo,
    getFilesStructure
} = require('../../../server/api/index');
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
});

describe('Получение файловой структуры', () => {
    it('Должен возвращать массив с именами файлов/папок ', async () => {
        const structure = await getFilesStructure({path: `${stubHash}:./${stubFolder}`});
        assert.deepEqual(structure.map(e => e.name), stubFolderContent);
    });
});
