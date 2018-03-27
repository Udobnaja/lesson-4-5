const chai = require('chai');
const expect = chai.expect;
const exec = require('../../../server/utils/child_process/exec');

describe('Проверка работы Утилиты Exec', () => {
    it('Должна соответствовать текущей рабочей дирректории', () => {
        exec('pwd').then((pwd) => {
            expect(pwd).to.equal(process.cwd());
        }).catch(e => e);
    });
});
