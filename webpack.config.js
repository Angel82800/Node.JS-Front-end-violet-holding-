var webpack = require('webpack');
var gutil = require('gulp-util');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './public/build/js/main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude:/node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  resolve: {
    alias: {
      'eventEmitter/EventEmitter': 'wolfy87-eventemitter/EventEmitter',
      'get-style-property/get-style-property': 'desandro-get-style-property/get-style-property',
      'matches-selector/matches-selector': 'desandro-matches-selector/matches-selector',
      'classie/classie': 'desandro-classie/classie'
    }
  },

  // Don't silently fail
  bail: true
}

// if passed variable type is prod compress JS - gulp build --type prod 
if(gutil.env.type === 'prod') {
  console.log('Compressing JS');
  module.exports.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true,
      mangle: false
    }),
  ];
}