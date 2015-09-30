var fs = require('fs');

module.exports = function (path) {

    var dataEntry, rezult;
    try {
        dataEntry = fs.readFileSync(path, 'utf8');
    } catch (er) {
        dataEntry = false;
    }

    if (dataEntry) {
        rezult = JSON.parse(dataEntry);
    } else {
        rezult = '{}';
    }
    return rezult;
}