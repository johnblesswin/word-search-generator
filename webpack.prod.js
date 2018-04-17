const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const publicPath = '/projects/word-search-generator/';

module.exports = merge(common, {
    output: {
        publicPath,
    },
    plugins: [
        //new BundleAnalyzerPlugin(),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'PUBLIC_PATH': JSON.stringify(publicPath)
            }
        })
    ]
});