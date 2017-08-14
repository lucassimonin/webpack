const path = require('path')
const uglifyJs = require('uglifyjs-webpack-plugin')
const dev = process.env.NODE_ENV === "dev"

let config = {
    entry: './assets/js/app.js',
    watch: true,
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    devtool: dev ? "cheap-module-eval-source-map" : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:['babel-loader']
            }

        ]
    },
    plugins: [
    ]
}

if(!dev) {
    config.plugins.push(new uglifyJs())
}

module.exports = config
