const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const CommonWebpackConfig = require('./webpack.config');

module.exports = merge(CommonWebpackConfig, {
    output: {
        filename: 'main.[contenthash].bundle.js', // contenthash is added for generating random strings(aplhanumeric)
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$\i/,
                use: ['html-loader']
            }
        ]
    }
})