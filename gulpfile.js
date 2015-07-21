"use strict";

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var browserify  = require('browserify');

// Input file.
watchify.args.debug = true;
var bundler = watchify(
  browserify('index.js', watchify.args)
  .add(require.resolve('babel/polyfill'))
  .add(require.resolve('whatwg-fetch/fetch'))
);

// Babel transform
bundler.transform(babelify.configure({}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  gutil.log('Compiling JS...');

  return bundler.bundle()
  .on('error', function (err) {
    gutil.log(err.message);
    this.emit("end");
  })
  .pipe(exorcist('dist/throttle.js.map'))
  .pipe(source('throttle.js'))
  .pipe(gulp.dest('./dist'));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', bundle);

gulp.task('default', ['bundle', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./dist/*', ['demo'])
});

gulp.task('demo', function () {
  gulp.src('./dist/*').pipe(gulp.dest('./demo'));
});
