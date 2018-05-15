var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var concatJs = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var replace = require('gulp-replace');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var BASE_URL = 'http://localhost:9090/';
var DESTINO = 'dist/';
var MEDIA = ''

// ----------------------------------------------------------------
function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}
// ----------------------------------------------------------------

gulp.task('fonts', function() {
  gulp.src([
    MEDIA + 'bower_components/font-awesome/fonts/*',
    MEDIA + 'bower_components/bootstrap/fonts/*',
  ])
  .pipe(plumber())
  .pipe(gulp.dest(DESTINO));
});

gulp.task('libs-css', function() {
  gulp.src([
    MEDIA + 'bower_components/bootstrap/dist/css/bootstrap.min.css',
    MEDIA + 'bower_components/font-awesome/css/font-awesome.min.css',
  ])
  .pipe(plumber())
  .pipe(concatCss('styles.min.css'))
  .pipe(minifyCss())
  .pipe(replace('../../../font-awesome/fonts/', BASE_URL + 'dist/'))
  .pipe(replace('../../../../assets/fontastic/fonts', BASE_URL + 'dist/'))
  .pipe(replace('../fonts/glyphicons', 'glyphicons'))
  .pipe(gulp.dest(DESTINO));
});

gulp.task('libs-js', function() {
  gulp.src([
    MEDIA + 'bower_components/jquery/dist/jquery.min.js',
    MEDIA + 'bower_components/bootstrap/dist/js/bootstrap.min.js',
    MEDIA + 'bower_components/underscore/underscore-min.js',
    MEDIA + 'bower_components/backbone/backbone-min.js',
    MEDIA + 'bower_components/backbone.marionette/lib/backbone.marionette.min.js',
    MEDIA + 'bower_components/handlebars/handlebars.min.js'
  ])
  .pipe(plumber())
  .pipe(concatJs('libs.min.js'))
  .pipe(gulp.dest(DESTINO));
});

gulp.task('libs', ['fonts', 'libs-css', 'libs-js']);
