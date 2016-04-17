var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './assets/js/app.js',
  },

  output: {
    path: './build',
    filename: 'bundle.js',
  },

  devtool: 'source-map',

  module: {
    loaders: [
      /* ----- JavaScript Loader ----- */
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },

      /* ----- SCSS Loader ----- */
      {
        test: /\.(scss|sass)$/,
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract('style-loader',
                  'css-loader?sourceMap!sass-loader?sourceMap&includePaths[]=' +
                  path.resolve(__dirname, './node_modules/compass-mixins/lib')),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('./[name].css'),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.scss'],
  }
};
