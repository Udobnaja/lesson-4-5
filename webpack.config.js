const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const path = require('path');
const DIST_DIR = path.join(__dirname, 'app/public');

const NodemonBrowsersyncPlugin = require('nodemon-browsersync-webpack-plugin');

// 2 вебпака пам пам env позже, clean, fonts, images, copy

console.log(path.join(__dirname, 'src'));

module.exports = {
    mode: 'development',
    output: {
        path: DIST_DIR,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: ['babel-loader']
            },

            {
                test:/\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sourceMapContents: true
                            }
                        }]
                })
            },

        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'./[name].css'
        }),
        new NodemonBrowsersyncPlugin({
                script: 'app.js',
                ignore: [
                    "src/*",
                ],
                ext: 'js json pug',
                verbose: true
            } // proxy??????
        )
    ],
    devtool : "source-map"
};