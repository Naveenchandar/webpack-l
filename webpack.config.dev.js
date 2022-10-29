const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const CommonWebpackConfig = require('./webpack.config');

module.exports = merge(CommonWebpackConfig, {
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader", // injects that into style tag
                    "css-loader" // converts css to js
                ]
            }
        ]
    }
})