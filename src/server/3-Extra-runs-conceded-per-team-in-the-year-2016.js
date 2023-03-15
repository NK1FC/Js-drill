const { matchesData, deliveriesData } = require('./csvreader'); // Importing Matches data and deliveries data
const writeFile = require('./file-writer'); // Importing Function to write File
const getMatchIdOfYear = require('./get-matchid-for-year');
const path = require('path');

/**
 * Calculates the total extra runs conceded by each team in all matches of a given year.
 * @param {Object} matchIdOfYear - An object containing the match ID and corresponding season for all matches played in a given year.
 * @param {Array} deliveries - An array of delivery objects.
 * @returns {Object} An object containing the total extra runs conceded by each team in all matches of the given year.
 * @returns {} An empty object if there is any error.
 */
function extraRunsConcededbyteams(matchIdOfYear, deliveries) {
    try {
        let runsConcededbyteams = deliveries.reduce((acc, delivery) => {
            match_id = delivery.match_id;
            if (matchIdOfYear.hasOwnProperty(match_id) === true) {
                team = delivery.bowling_team;
                runs = delivery.extra_runs;
                acc[team] = (acc[team] || 0) + parseInt(runs);
            }
            return acc;
        }, {})
        return runsConcededbyteams;
    } catch (err) {
        console.log(err);
        return {};
    }
}




// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '3-Extra-runs-conceded-per-team-in-the-year-2016.json');

Promise.all([matchesData, deliveriesData]).then(([matches, deliveries]) => {
    let matchIdOfYear = getMatchIdOfYear(matches, 2016);
    let runsConcededbyteams = extraRunsConcededbyteams(matchIdOfYear, deliveries);
    console.log(runsConcededbyteams);// Logging the output to the console
    writeFile(OutputPath, runsConcededbyteams);  // Writing the output to a JSON file    
})

