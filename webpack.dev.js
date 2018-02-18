const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: __dirname + '/dist',
        host: '0.0.0.0'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
});