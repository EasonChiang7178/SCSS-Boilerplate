var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    importOnce = require('node-sass-import-once');

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

  // Options for SCSS loader
  sassLoader: {
    importer: importOnce,
    importOnce: {
      index: true,
      css: true,
      bower: false,
    }
  },

  plugins: [
    new ExtractTextPlugin('./[name].css'),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.scss'],
  }
};
