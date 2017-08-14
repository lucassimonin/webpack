const path = require('path')
const uglifyJs = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const dev = process.env.NODE_ENV === "dev"

let cssLoaders = [
    {loader: 'css-loader', options: {minimize: !dev}}
]

let config = {
    entry: {
        app: './assets/js/app.js'
    },
    watch: true,
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: '/dist/'
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
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: dev
        })
    ]
}

if(!dev) {
    config.plugins.push(new uglifyJs())
}

module.exports = config
