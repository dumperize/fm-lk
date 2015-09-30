var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = function (buildOptions) {
    gulp.task('html:concat-data-for-php', function (cb) {
        runSequence(
            [
                'html:concat-data'
            ],
            [
                'html:concat-pages-data-for-php',
                'html:concat-modules-data-for-php'
            ],
            cb
        );
    });
}