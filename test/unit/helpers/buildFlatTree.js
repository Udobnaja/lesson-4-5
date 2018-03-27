const {expect} = require('chai');
const buildFlatTree = require('../../../server/helpers/buildFlatTree');
const {
    stubPathToFile,
    expectTree
} = require('../../fixtures/stubs');

describe('Проверка работы helper функции buildFlatTree', () => {
    it('Должна возвращать объект с поддиректориями из строки, представляющей собой путь к файлу', () => {
        const tree = buildFlatTree(stubPathToFile, stubPathToFile);
        expect(tree).to.deep.include(expectTree);
    });
});
