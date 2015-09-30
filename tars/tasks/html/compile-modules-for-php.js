var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var beml = require('gulp-beml');
var tarsConfig = require('../../../tars-config');
var replace = require('gulp-replace-task');
var notifier = require('../../helpers/notifier');
var fs = require('fs');

/**
 * Handlebars compilation of pages templates.
 * Templates with _ prefix won't be compiled
 * @param  {Object} buildOptions
 */
module.exports = function (buildOptions) {


    var patterns = [];
    if (!gutil.env.ie8) {
        patterns.push(
            {
                match: '<link href="%=staticPrefix=%/css/main_ie8%=hash=%%=min=%.css" rel="stylesheet" type="text/css">',
                replacement: ''
            }
        );
    }

    if (gutil.env.min || gutil.env.release) {
        patterns.push(
            {
                match: '%=min=%',
                replacement: '.min'
            }
        );
    } else {
        patterns.push(
            {
                match: '%=min=%',
                replacement: ''
            }
        );
    }

    if (gutil.env.release) {
        patterns.push(
            {
                match: '%=hash=%',
                replacement: buildOptions.hash
            }
        );
    } else {
        patterns.push(
            {
                match: '%=hash=%',
                replacement: ''
            }
        );
    }

    patterns.push(
        {
            match: '%=staticPrefix=%',
            replacement: tarsConfig.staticPrefixForPhp
        }
    );

    return gulp.task('html:compile-modules-for-php', function (cb) {
        return gulp.src([
            './markup/modules/**/*.html'
        ])
            .pipe(replace({
                patterns: patterns,
                usePrefix: false
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while replacing placeholdres.\nLook in the console for details.\n' + error;
            }))
            .pipe(beml())
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while beml html-files.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/modules/'))
            .pipe(
            notifier('Templates modules\'ve been compiled')
        );
    });
};
