module.exports = function (array) {
    var rezult = {};
    var hashKeys = Object.keys(array);
    for (var i = 0, l = hashKeys.length; i < l; ++i) {
        var p = array[hashKeys[i]];
        var hashKeysIn = Object.keys(p);
        for (var j = 0, m = hashKeysIn.length; j < m; ++j) {
            rezult[hashKeysIn[j]] = p[hashKeysIn[j]];
        }
    }
    return rezult;
}