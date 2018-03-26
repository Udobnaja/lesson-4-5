const exec = require('../utils/child_process/exec');
const config = require('../config/index');
const options = config.setting.exec.options;
const readDir = require('../utils/fs/readdir');


const getFileContent = async ({name}) => {
    return await exec(`git cat-file -p ${name}`, options);
};

const getBranchList = async () => {
    return await readDir(`${options.cwd}/${config.setting.git}refs/heads/`);
};

const getCommitsListHash = async ({branch}) => {
    let hashListString = await exec(`git log ${branch} --pretty=format:'%H'`, options);
    return hashListString.split('\n');
};

const getCommitInfo = async ({hash}) => {
    return await exec(`git show --quiet --pretty=' 
       Author: %an 
       Date: %ar 
       Commit message: %s' ${hash}`, options);
};

const getFormattedCommitList = async ({branch}) => {
    return await getCommitsListHash({branch})
        .then((hashList) => {
            const promises = [];

            for (let hash of hashList) {
                promises.push(getCommitInfo({hash})
                    .then((info) => {
                        return {hash, info};
                    }).catch(e => e));
            }

            return Promise.all([...promises]);

        }).catch((error) => {
            return error;
        });
};

module.exports = {
    getFileContent,
    getBranchList,
    getCommitsListHash,
    getCommitInfo,
    getFormattedCommitList
};

