module.exports = function (arrayReplace, arrayReplacer) {

    function iterator(array, data, callback) {
        var item, i = 0;
        var hashKeys = Object.keys(array);
        for (var i = 0, l = hashKeys.length; i < l; ++i) {
            item = array[hashKeys[i]];
            if (Object.prototype.toString.call(item) === '[object Object]' || Object.prototype.toString.call(item) === '[object Array]') {
                iterator(item, data, callback);
            } else {
                array[hashKeys[i]] = callback(item, data);
            }
        }
        return array;
    }

    function callback(item, data) {
        var readyBlocksData = data;
        if (Object.prototype.toString.call(item) !== '[object Boolean]' && (item.indexOf('readyBlocksData.') + 1)) {
            eval('var m = ' + item + ';');
            return m;
        } else
            return item;
    }

    return iterator(arrayReplace, arrayReplacer, callback);
};
