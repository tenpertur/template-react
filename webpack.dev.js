const { merge } = require('webpack-merge');
const { join } = require('path');
const common = require('./webpack.common.js');

const PORT = process.env.PORT || 3000;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: join(__dirname, 'dist'),
        },
        port: PORT,
        hot: true,
        open: true,
        client: {
            overlay: true,
        },
    },
    optimization: {
        minimize: false,
    },
});
