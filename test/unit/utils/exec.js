const chai = require('chai');
const expect = chai.expect;
const exec = require('../../../app/utils/child_process/exec');

describe('Exec util', () => {
    it('Should be equal current working dirrectory', () => {
        exec('pwd').then((pwd) => {
            expect(pwd).to.equal(process.cwd());
        }).catch(() => {

        });
    });
});
