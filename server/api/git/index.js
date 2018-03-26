const exec = require('../../utils/child_process/exec');
const config = require('../../config');
const options = config.setting.exec.options;


exports.catFile = async ({name}) => {
    return await exec(`git cat-file -p ${name}`, options);
};
