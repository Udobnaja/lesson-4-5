const exec = require('../utils/child_process/exec');
const config = require('../config/index');
const options = config.setting.exec.options;
const readDir = require('../utils/fs/readdir');


exports.getFileContent = async ({name}) => {
    return await exec(`git cat-file -p ${name}`, options);
};

exports.getBranchList = async () => {
    return await readDir(`${options.cwd}/${config.setting.git}refs/heads/`);
};

