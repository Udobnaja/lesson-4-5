const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const path = require('path');
const DIST_DIR = path.join(__dirname, '/public');

// const NodemonBrowsersyncPlugin = require('nodemon-browsersync-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {styles: './client/sass/styles.scss', index: './client/index.js'},
    output: {
        path: DIST_DIR,
    },
    watch: !isProduction,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: ['babel-loader']
            },
            {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true,
                                minimize: isProduction,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
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
        new CleanWebpackPlugin([DIST_DIR]),
        new ExtractTextPlugin({
            filename: './[name].css'
        }),
        new CopyWebpackPlugin([
            {
                from: ('client/images/favicon/*.ico'),
                to: 'images/favicon/[name].[ext]'
            },
        ])
    ],
    devtool: isProduction ? false : 'source-map'
};
