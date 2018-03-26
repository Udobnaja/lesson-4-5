const exec = require('../utils/child_process/exec');
const config = require('../config/index');
const options = config.setting.exec.options;


exports.getFileContent = async ({name}) => {
    return await exec(`git cat-file -p ${name}`, options);
};

