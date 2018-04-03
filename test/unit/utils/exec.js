const chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-as-promised'));
const exec = require('../../../server/utils/child_process/exec');

describe('Проверка работы Утилиты Exec', () => {
    it('Должна соответствовать текущей рабочей дирректории', () => {
        exec('pwd').then((pwd) => {
            expect(pwd).to.equal(process.cwd());
        }).catch(e => e);
    });

    it('Должна выбрасывать ошибку, если, например, такой команды не существует', async () => {
        await exec('not exist').should.be.rejectedWith(Error);
    });
});
