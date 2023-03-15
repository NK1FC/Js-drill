const fs = require('fs');

/**
 * Writes the provided query object to a JSON file at the specified outputFilePath.
 * @param {string} outputFilePath - The file path of the output file to write the data to.
 * @param {Object} query - The data to write to the output file.
 */
function writeFile(outputFilePath, query) {
    fs.writeFileSync(outputFilePath, JSON.stringify((query), null, 2), (err) => { if (err) console.log(err) });
}


module.exports = writeFile;