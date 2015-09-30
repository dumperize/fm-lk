var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var concat_json = require("gulp-concat-json");
var notifier = require('../../helpers/notifier');
var readJson = require('../../helpers/read-json');
var walk = require('../../helpers/data-array-walk');
var downLevel = require('../../helpers/down-level-object');
var tarsConfig = require('../../../tars-config');

/**
 * merge pages and modules data to one file
 * @param  {object} buildOptions
 */

module.exports = function (buildOptions) {

    return gulp.task('html:concat-data', ['html:concat-pages-data', 'html:concat-modules-data'], function (cb) {
        function string_src(filename, string) {
            var src = require('stream').Readable({objectMode: true})
            src._read = function () {
                this.push(new gutil.File({cwd: "", base: "", path: filename, contents: new Buffer(string)}))
                this.push(null)
            }
            return src
        }

        var readyBlocksData, readyPagesData, error;
        try {
            readyBlocksData = downLevel(readJson('./dev/temp/blockData.json'));
            readyPagesData = downLevel(readJson('./dev/temp/pageData.json'));
            readyBlocksData = walk(readyBlocksData, readyBlocksData);
            readyPagesData = walk(readyPagesData, readyBlocksData);
        } catch (er) {
            error = er;
            readyPagesData = {};
        }

        return string_src("data.json", JSON.stringify(readyPagesData))
            .pipe(gulp.dest('./dev/temp/'))

    });
};