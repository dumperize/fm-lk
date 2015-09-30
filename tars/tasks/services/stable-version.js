var gulp = require('gulp');
var notify = require('gulp-notify');

var tarsConfig = require('../../../tars-config');

module.exports = function (buildOptions) {
    return gulp.task('service:stable-version', function () {
    //    del(tarsConfig.buildPath + '/stable', function () {
    //    });
        return gulp.src(buildOptions.buildPath + '/**/*.*')
            .pipe(gulp.dest(tarsConfig.buildPath + '/stable/'))
    });
}