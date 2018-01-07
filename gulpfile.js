/*
  Tasks:
  gulp / gulp dev = compiles JS and CSS + runs browserSync,
  gulp build = compiles JS and CSS
  gulp build --type prod = compiles and compresses JS and CSS
*/

/*
  Info:
  All files are built on deploy so the built files are ignored from the repo.
*/

var gulp  = require('gulp');
var sass  = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webpack  = require('webpack');
var gutil  = require('gulp-util');
var concat  = require('gulp-concat');
var browserSync = require('browser-sync').create();
var lost = require('lost');
var postcss = require('gulp-postcss');
var normalizer = require('postcss-normalize');

var PATHS = {
  src: './src',
  dist: './public/build',
  js: './src/js/*.js',
  sass: './src/css/*.scss',
  sassEntry: './src/css/index.scss',
  webpackConfig: './webpack.config.js',
  templates: './craft/templates'
};

// BrowserSync
gulp.task('browser-sync', function() {

    var watchFiles = [
      PATHS.dist + '/css/*.css',
      PATHS.dist + '/js/*.js',
      PATHS.templates + '/**/**/*'
    ];

    browserSync.init(watchFiles, {
        proxy: 'http://violet.dev',
        notify: false,
        host: '192.168.56.222'
    });
});

// Convert ES6 to ES5
gulp.task('compile-js', function(done) {
  webpack(require(PATHS.webpackConfig), function(err, stats) {
    if (err) {
      // Strip references to the current directory so the lines aren't so long
      var currentDir = new RegExp(__dirname, 'g');
      var message = err.message.replace(currentDir, '.');

      // Print error message
      gutil.log(gutil.colors.red('Webpack build error:'));
      console.log(message);
    } else {
      gutil.log(gutil.colors.blue('Webpack build success'));
    }

    // Let gulp know Webpack is done
    done();
  });
});

// Convert sass to css
gulp.task('compile-sass', function () {

  // if passed variable type is prod compress CSS - gulp build --type prod
  var sassOptions = gutil.env.type === 'prod' ? { outputStyle: 'compressed' } : {};
  
  return gulp.src(PATHS.sassEntry)
   .pipe(sass().on('error', sass.logError))
   .pipe(postcss([lost(), normalizer]))
   .pipe(autoprefixer())
   .pipe(concat('main.css'))
   .pipe(gulp.dest(PATHS.dist + '/css'));

});

// build
gulp.task('build', ['compile-js', 'compile-sass']);

// dev
gulp.task('dev', ['build', 'browser-sync'], function(done) {

  gulp.watch([
    PATHS.src + '/js/*.js',
    PATHS.src + '/js/**/*.js'
  ],['compile-js']);

  gulp.watch([
    PATHS.src + '/css/*.scss',
    PATHS.src + '/css/**/*.scss'
  ],['compile-sass']);

});

// default task
gulp.task('default', ['dev']);