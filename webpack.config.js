const path = require('path')
const uglifyJs = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dev = process.env.NODE_ENV === "dev"

let cssLoaders = [
    {loader: 'css-loader', options: {minimize: !dev}}
]

let config = {
    entry: {
        app: ['./assets/css/app.css', './assets/js/app.js']
    },
    watch: dev,
    output: {
        path: path.resolve('./dist'),
        filename: dev ? '[name].js' : '[name].[chunkhash:8].js',
        publicPath: '/dist/'
    },
    resolve: {
        alias: {
            '@css': path.resolve('./assets/css/'),
            '@': path.resolve('./assets/js/')
        }
    },
    devtool: dev ? "cheap-module-eval-source-map" : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:['babel-loader']
            },
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: cssLoaders
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:7].[ext]'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: !dev
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: dev ? '[name].css' : '[name].[contenthash:8].css',
            disable: dev
        })
    ]
}

if(!dev) {
    config.plugins.push(new uglifyJs())
    config.plugins.push(new ManifestPlugin())
    config.plugins.push(new CleanWebpackPlugin(['dist'], {
        root: path.resolve('./')
    }))

}



module.exports = config
