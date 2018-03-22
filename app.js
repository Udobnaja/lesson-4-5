const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

//define middle wares

const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require("morgan");
const errorhandler = require("errorhandler");

const config = require('./app/config');
const isProduction = process.env.NODE_ENV === 'production';

// using middlewares from middlewares directory

// const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
//
// middlewares.forEach((middleware) => {
//     app.use(require('./middlewares/' + middleware));
// });

// Using middlewares
// compression, os, cors middlewares  - maybe latter

// favicon
// app.use(favicon(path.join(__dirname, 'app/public/images', 'favicon.ico')));


// static
app.use(express.static('./app/public'));

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
app.set('views', './app/templates');
app.set('view engine', 'pug');

// routing
const index = require('./app/routes/');
const terminal = require('./app/routes/term');
const branch = require('./app/routes/branch');
const tree = require('./app/routes/tree');
const blob = require('./app/routes/blob');
app.use(index);
app.use(terminal);
app.use(branch);
app.use(tree);
app.use(blob);
app.use(require('./app/routes/path'));
// 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (!isProduction) {
        console.log(err.stack);
    }

    res.status(err.status || 500);

    res.render('error', {
        message: err.message,
        error: isProduction ? {} : err,
    });
});

app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
});

