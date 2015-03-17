var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

function handleError(err) {
    console.log(err.message);
    this.emit('end');
}

gulp.task('lint', function() {
  return gulp
    .src(['gulpfile.js', 'lib/*.js', 'tests/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp
    .src('lib/**/*.js',{require:'spec/helpers/chai.js'})
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
        gulp.src(['tests/**/*.js'])
            .pipe(mocha({reporter: 'nyan', timeout: 5000, require: 'spec/helpers/chai.sj'}))
            .pipe(istanbul.writeReports()) // Creating the reports after tests runned
            .on('end', function() {
                console.log('ended');
            });
    });
});

gulp.task('default', ['lint', 'test'], function() {
  gulp.watch(['lib/*.js', 'tests/**/*.js'], function() {
    gulp.run('lint', 'test');
  });
});