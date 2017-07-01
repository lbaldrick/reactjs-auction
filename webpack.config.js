var webpack = require('webpack');
var path = require("path");

module.exports = {
  devtool: 'source-map',
  entry: {

    app: [ 
      'whatwg-fetch',
      './src/index',
        // For hot style updates
        'webpack/hot/dev-server',

        // The script refreshing the browser on hot updates
        'webpack-dev-server/client?http://localhost:8080',
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
  plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
      new webpack.HotModuleReplacementPlugin(),
    ],
};
