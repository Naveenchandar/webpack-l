const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const CommonWebpackConfig = require('./webpack.config');
const MinifyCssPlugin = require('mini-css-extract-plugin');

module.exports = merge(CommonWebpackConfig, {
    output: {
        filename: 'main.[contenthash].bundle.js', // contenthash is added for generating random strings(aplhanumeric)
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    plugins: [
        new MinifyCssPlugin({
            filename: "[name].[contenthash].bundle.css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MinifyCssPlugin.loader, // extracts to separate css file
                    "css-loader" // converts css into js
                ]
            }
        ]
    }
})