var gulp = require('gulp');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');


module.exports = function (buildOptions) {
    return gulp.task('other:move-json', function () {
        return gulp.src('./markup/modules/**/data/*.json')
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving fonts.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/'))
            .pipe(
            notifier('Fonts\'ve been moved')
        );
    });
}