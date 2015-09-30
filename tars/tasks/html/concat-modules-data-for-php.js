var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var jeditor = require('gulp-json-editor');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');
var readJson = require('../../helpers/read-json');
var walk = require('../../helpers/data-array-walk');
var downLevel = require('../../helpers/down-level-object');

/**
 * conact data for modules to one file
 * @param  {object} buildOptions
 */

module.exports = function (buildOptions) {

    return gulp.task('html:concat-modules-data-for-php', function (cb) {

        return gulp.src('./markup/modules/**/data/*.json')
            .pipe(jeditor(function (json) {
                    var readyBlocksData = downLevel(readJson('./dev/temp/blockData.json'));
                    readyBlocksData = walk(readyBlocksData, readyBlocksData);
                    return walk(json, readyBlocksData);
                }
            ))
            .pipe(gulp.dest("./dev/modules/"));
    });
};