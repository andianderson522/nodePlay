var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var util = require('gulp-util');

var sourceDirs = ['config/*.js', 'app.js', 'gulpfile.js', 'logger/*.js' ];

function handleError(err) {
    console.log(err.message);
    this.emit('end');
}

gulp.task('lint', function() {
  return gulp
    .src(sourceDirs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp
    .src(sourceDirs, util.env)
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
        gulp.src(['tests/**/*.js'])
            .pipe(mocha({reporter: 'nyan', timeout: 10000}))
        //    .pipe(istanbul.writeReports()) // Creating the reports after tests runned
            .on('end', function() {
                console.log('ended');
            });
    });
});

gulp.task('default', ['lint', 'test'], function() {
    //var watchFiles = sourceDirs.slice();
    //watchFiles.push('tests/**/*.js');
    //gulp.watch(watchFiles, function() {
        gulp.run('lint', 'test');
    //});
});

gulp.task('watch', function(){
    var watchFiles = sourceDirs.slice();
    watchFiles.push('tests/**/*.js');
    gulp.watch(watchFiles, function() {
        gulp.run('lint', 'test');
    });
});
