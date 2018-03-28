const exec = require('child_process').exec;

module.exports = (command, options) => new Promise((resolve, reject) => {
    exec(command, options, (err, stdout, stderr) => {
        if (err || stderr) {
            return reject(err || stderr);
        }
        resolve(stdout);
    });
});
