const { matchesData } = require('./helpler-functions/csvreader'); // Importing Matches data
const writeFile = require('./helpler-functions/file-writer'); // Importing Function to write File
const path = require('path');



/**
 * Counts the number of matches won by each team for each season.
 * @param {Array} matches - An array of match objects.
 * @returns {Object} An object containing the number of matches won by each team for each season.
 * @returns {} An empty object if there is any error.
 */
function matchesWonPerTeamPerYear(matches) {
    try {
        let gamesWonPerTeamPerYear = matches.reduce((acc, match) => {
            let season = match.season;
            let team = match.winner;
            acc[season] = (acc[season] || {})
            acc[season][team] = (acc[season][team] || 0) + 1;
            return acc;
        }, {})
        return gamesWonPerTeamPerYear;
    } catch (err) {
        console.log(err);
        return {};
    }
}




// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '2-matches-Won-Per-Team-Per-Year.json');

matchesData.then((matches) => {

    let gamesWonPerTeamPerYear = matchesWonPerTeamPerYear(matches);  
    console.log(gamesWonPerTeamPerYear); 
    writeFile(OutputPath, gamesWonPerTeamPerYear);  // Writing the output to a JSON file

});

