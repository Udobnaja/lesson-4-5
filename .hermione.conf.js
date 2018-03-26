const config = require('./server/config/');

module.exports = {
    baseUrl: `http://${config.host}:${config.port}`,
    // gridUrl: 'http://0.0.0.0:4444/wd/hub/', ломает все мне
    sets: {
        desktop: {
            files: 'test/integration'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        // firefox: {
        //     desiredCapabilities: {
        //         browserName: 'firefox'
        //     }
        // }
    }
};