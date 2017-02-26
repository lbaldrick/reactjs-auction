var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [ 
      'whatwg-fetch',
      './src/index'
    ],
    vendor: ['react', 'react-dom'],
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
                test: /\.jsx?/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
              },
              // Load SCSS
             { 
               test: /\.scss?/, loader: "style!css!autoprefixer!sass" 
             },
             {
               test: /\.(png|jpg)$/, 
	             loader: 'url-loader?limit=8192'
             },
             { 
               test: /\.json$/, 
               loader: "json-loader"
             }
           ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css', 'jpeg']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    // new webpack.DefinePlugin({
    // 'process.env': {
    //   'NODE_ENV': JSON.stringify('production')
    // }
    //})
    ],
};
