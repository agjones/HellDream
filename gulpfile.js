// Include gulp
var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Default task - watches
gulp.task('default', ['watch']);

// Build umbrella task
gulp.task('build', ['js-build', 'html-build', 'bower-build', 'node-build']);

// Dev build
gulp.task('dev-build', ['build', 'node-dev-config-build']);

// Prod build
gulp.task('prod-build', ['build', 'node-prod-config-build']);

// Cleans deploy folder
gulp.task('clean', function() {
  return gulp.src('dist/')
    .pipe(clean());
});

// Building JS for deployment
gulp.task('js-build', function() {
  return gulp.src('src/public/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist/public/js'));
});

gulp.task('node-build', function() {
    gulp.src('dist/server/config/')
        .pipe(clean());
    return gulp.src(['src/server/**/*.js', '!src/server/config/*'])
        .pipe(gulp.dest('dist/server/'));
});

// Building html for deployment
gulp.task('html-build', function() {
  return gulp.src('src/public/html/**/*.html')
    .pipe(gulp.dest('dist/public'));
});

gulp.task('node-dev-config-build', function() {
    return gulp.src(['src/server/config/config.dev.js'])
        .pipe(rename('config.js'))
        .pipe(gulp.dest('dist/server/config'));
});

gulp.task('node-prod-config-build', function() {
    return gulp.src(['src/server/config/config.prod.js'])
        .pipe(rename('config.js'))
        .pipe(gulp.dest('dist/server/config'));
});

// Watcher task, monitors angular/node code to restart app and redeploy
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['build']);
});

// Moving bower packages for deployment
gulp.task('bower-build', ['angular-build', 'bootstrap-build', 'jquery-build']);

gulp.task('angular-build', function() {
  return gulp.src('bower_components/angular/angular.min.js')
    .pipe(gulp.dest('dist/public/js'));
});

gulp.task('bootstrap-build', function() {
  return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('dist/public/css'));
});

gulp.task('jquery-build', function() {
  return gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/server/js'));
});

