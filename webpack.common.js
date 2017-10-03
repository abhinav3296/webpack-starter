const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: {
        // specify main entry in case a project grows in the future
        main: './src/script.js',
    },
    output: {
        // this as where assets will be outputed
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: './'
    },
    module: {
        // loaders are loaded backwards, so the last one in the array will be loaded as the first
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')(),
                                ],
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: '',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                optimizationLevel: 3
                            },
                            pngquant: {
                                quality: '65-70'
                            },
                            mozjpeg: {
                                quality: 65
                            },
                            svgo: {
                                plugins: [{
                                        convertStyleToAttrs: true
                                    },
                                    {
                                        removeDimensions: true
                                    },
                                    {
                                        removeTitle: true
                                    },

                                ]
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'font/'
                    }
                }]
            },
            {
                test: /\.ejs$/,
                use: [{
                    loader: 'html-loader',
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                minifyJS: true,
                removeComments: true
            },
            hash: true,
            template: './src/index.ejs',
        }),
        new ScriptExtHtmlWebpackPlugin({
            // sync: 'important',
            defaultAttribute: 'defer'
        }),
        new webpack.ProvidePlugin({
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
    ]
};