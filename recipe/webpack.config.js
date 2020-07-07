const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',  // where webpack will start. Can specify one or more entry files
    output: {
        path: path.resolve(__dirname, 'dist'), // needs to have an absolute path using a built in node package
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]

};
