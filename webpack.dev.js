const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        compress: true, // gzip
        stats: 'minimal',
        open: true,
        overlay: true
    }
});