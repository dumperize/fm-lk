/**
 * Generate build version
 * @return {String} build version
 */
module.exports = function() {
    var date = new Date();
    var values = [date.getDate(), date.getMonth() + 1, date.getHours(), date.getMinutes(), date.getSeconds()];
    for (var id in values) {
        values[ id ] = values[ id ].toString().replace(/^([0-9])$/, '0$1');
    }
    var buildVerion = '_ver-' + date.getFullYear() + '_' + values[ 1 ] + '_' + values[ 0 ] + '-' + values[ 2 ] + '_' + values[ 3 ] + '_' + values[ 4 ];

    // build version is current date without spaces (replaced to _) and without time zone info.
    // You could change it.
    //buildVerion = buildVerion.replace(/ /g, '_').replace(/:/g, '-').match(/.*\d\d-\d\d-\d\d/)[0];

    return buildVerion;
};