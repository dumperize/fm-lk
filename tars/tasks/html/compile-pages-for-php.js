var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var beml = require('gulp-beml');
var tarsConfig = require('../../../tars-config');
var replace = require('gulp-replace-task');
var notifier = require('../../helpers/notifier');
var fs = require('fs');

var handlebarsOptions = {
    batch: ['./markup/modules'],
    helpers: require('../../helpers/handlebars-helpers')
};

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

    return gulp.task('html:compile-pages-for-php', function (cb) {

        return gulp.src([
            './markup/pages/**/*.html',
            '!./markup/pages/**/_*.html',
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
            .pipe(gulp.dest('./dev/pages/'))
            .pipe(
            notifier('Templates pages\'ve been compiled')
        );
    });
};
