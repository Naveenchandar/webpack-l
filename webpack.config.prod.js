const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const MinifyCssPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CommonWebpackConfig = require('./webpack.config');

module.exports = merge(CommonWebpackConfig, {
    output: {
        filename: 'main.[contenthash].bundle.js', // contenthash is added for generating random strings(aplhanumeric)
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    plugins: [
        new MinifyCssPlugin({
            filename: "[name].[contenthash].bundle.css",
        }),
        new CleanWebpackPlugin() // to clean up previously generated files
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