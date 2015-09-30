var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var beml = require('gulp-beml');
var jeditor = require('gulp-json-editor');
var fs = require('fs');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');

/**
 * Minify HTML (optional task)
 * @param  {object} buildOptions
 */
function concatModulesData(pathData) {
    var dataEntry, readyBlocksData;
    try {
        dataEntry = fs.readFileSync(pathData, 'utf8');
    } catch (er) {
        dataEntry = false;
    }

    if (dataEntry) {
        eval('readyBlocksData = {' + dataEntry + '}');
    } else {
        readyBlocksData = '{}';
    }
    return readyBlocksData;
}

module.exports = function(buildOptions) {
    return gulp.task('html:beml', function(cb) {


        gulp.src('./markup/pages/**/data/json.json')
                .pipe(jeditor(function(json) {
            var readyBlocksData;
            try {
                readyBlocksData = concatModulesData('./dev/temp/blockData.js');
            } catch (er) {
                error = er;
                modulesData = false;
            }

            function iterator(array, readyBlocksData, callback) {
                var item, i = 0;
                for (i in array) {
                    item = array[i];
                    if (Object.prototype.toString.call(item) === '[object Object]') {
                        iterator(item, readyBlocksData, callback);
                    } else {
                        array[i] = callback(item, readyBlocksData);
                    }
                }
                return array;
            }

            function callback(item, readyBlocksData) {
                if (item.indexOf('readyBlocksData.') + 1) {
                    eval('var m = ' + item + ';');
                    return m;
                } else 
                    return item;
            }

            json = iterator(json, readyBlocksData, callback);
            return json; // must return JSON object. 
        }))
                .pipe(gulp.dest("./dev/pages/"));

      
        if (tarsConfig.beml) {
            return gulp.src([
                './markup/modules/**/*.html',
                './markup/modules/main/**/*.html'
            ])
                    .pipe(beml())
                    .on('error', notify.onError(function(error) {
                return '\nAn error occurred while beml html-files.\nLook in the console for details.\n' + error;
            }))
                    .pipe(gulp.dest('./dev/modules/'))
                    .pipe(
                    notifier('Html \'ve been bemled')
                    );
            return gulp.src([
                './markup/pages/**/*.html',
                '!./markup/pages/**/_*.html',
            ])
                    .pipe(beml())
                    .on('error', notify.onError(function(error) {
                return '\nAn error occurred while beml html-files.\nLook in the console for details.\n' + error;
            }))
                    .pipe(gulp.dest('./dev/pages'))
                    .pipe(
                    notifier('Html \'ve been bemled')
                    );
        } else {
            gutil.log('!Html-beml disabled!');
            cb(null);
        }
    });
};