const { merge } = require('webpack-merge');
const { join } = require('path');
const common = require('./webpack.common.js');
const ReactRefreshWebpackplugin = require('@pmmmwh/react-refresh-webpack-plugin')

const PORT = process.env.PORT || 3000;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: join(__dirname, 'public'),
        },
        port: PORT,
        hot: true,
        open: true,
        client: {
            overlay: true,
        },
        compress: true,
        historyApiFallback: true
    },
    module : {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use :[
                    'style-loader',
                    {
                        loader : 'css-loader',
                        options : {
                            modules: {
                                auto : true,
                                localIdentName: "[path][name]__[local]"
                            }
                        }
                    },
                    'sass-loader'
                ],
                include: "/src/"
            },
            {
                test: /\.[jt]sx$/,
                exclude: /node_modules/,
                use :[
                    {
                        loader : require.resolve('babel-loader'),
                        options : {
                            plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new ReactRefreshWebpackplugin()
    ].filter(Boolean),
    optimization: {
        minimize: false,
        runtimeChunk: 'single'
    },
});
