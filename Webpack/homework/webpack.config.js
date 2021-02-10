const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const fileName = extension => isDev ? `[name].${extension}` : `[name].[contenthash].${extension}`;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Optimaze = require('optimize-css-assets-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

const optimization = () => {
    const con = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if(isProd) {
        con.minimizer = [
            new Optimaze(),
            new Terser()
        ]
    }
    return con;
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        filename: `./js/${fileName('js')}`,
        path: path.resolve(__dirname, 'app'),
        publicPath: ''
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'app'),
        open: true,
        compress: true,
        port: 3000
    },
    optimization: optimization(),

    
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${fileName('css')}`
        }),

        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
              quality: '95-100'
            }
          })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules',
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use:  [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                              }
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: `./img/${fileName(['ext'])}`
                    }
                }]
            }
        ]
    }
}