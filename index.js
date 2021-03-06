const express = require('express');
const app = express();
const compression = require('compression');
const publicDir = '/public';

const path = require('path');
const fs = require('fs');

// // define middle wares

const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const errorhandler = require('errorhandler');

const config = require('./server/config');
const isProduction = process.env.NODE_ENV === 'production';

// Using middlewares

// Cors midleware вроде как и не нужна

// static
app.use(compression());
app.use(express.static(`.${publicDir}`));

// favicon
if (isProduction) {
    app.use(favicon(`.${publicDir}/images/favicon/favicon.ico`));
}

// logger
app.use(logger(config.logger.format));

// body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// error-handler
if (!isProduction) {
    app.use(errorhandler());
}

// templates
app.set('views', './server/templates');
app.set('view engine', 'pug');

// routing

app
    .use(require('./server/routes/'))
    // .use(require('./server/routes/term'))
    .use(require('./server/routes/branch'))
    .use(require('./server/routes/tree'))
    .use(require('./server/routes/blob'))
    .use(require('./server/routes/ls-tree'));
// 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}).use((err, req, res, next) => {
    if (!isProduction) {
        if (err) {
            console.error(err.stack);
        }
    }

    res.status(err.status || 500);

    res.render('error', {
        message: err.message,
        error: isProduction ? {} : err,
    });
});

app.listen(config.port, config.host, () => {
    console.log(`listen port ${config.port}`);
});

