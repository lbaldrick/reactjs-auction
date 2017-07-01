var path = require('path');
var buildPath = path.resolve(__dirname, 'dist', 'production');
var mainPath = path.resolve(__dirname, 'src', 'index.js');

var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: mainPath,
    entry: {
        app: [
            'whatwg-fetch',
            mainPath,
        ],
        vendor: ['react', 'react-dom'],
    },
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss?/,
                loader: "style!css!autoprefixer!sass"
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file',
                include: './img'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }]
    }
};

module.exports = config;