
const { matchesData } = require('./helpler-functions/csvreader'); // Importing Matches data
const writeFile = require('./helpler-functions/file-writer'); // Importing Function to write File
const path = require('path');


/**
 * Counts the number of matches played per season.
 * @param {Array} matches - An array of match objects.
 * @returns {Object}  An object containing the total number of matches played per season.
 * @returns {}  An empty object if their is any error.
 */

function countMatchesPerSeason(matches) {
    try {
        let totalMatchesPlayedPerYear = matches.reduce((acc, match) => {
            let season = match.season;
            acc[season] = (acc[season] || 0) + 1;
            return acc;
        }, {})
        return totalMatchesPlayedPerYear;
    } catch (err) {
        return {};
    }
}


// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '1-matches-per-year.json');

matchesData.then((matches) => {

    let totalMatchesPlayedPerYear = countMatchesPerSeason(matches);  
    console.log(totalMatchesPlayedPerYear);
    writeFile(OutputPath, totalMatchesPlayedPerYear);  // Writing the output to a JSON file

});

