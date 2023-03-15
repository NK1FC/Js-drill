const { matchesData, deliveriesData } = require('./helpler-functions/csvreader'); // Importing Matches data and deliveries data
const writeFile = require('./helpler-functions/file-writer'); // Importing Function to write File
const getMatchIdOfYear = require('./helpler-functions/get-matchid-for-year');
const selectTopsortObject = require('./sort-and-slice-object');
const path = require('path');

/**
 * Returns an object containing the count of balls and runs for each bowler in a given match, based on the deliveries data.
 * @param {number} matchIdOfYear - The ID of the match to filter the deliveries by.
 * @param {Array} deliveries - An array of objects representing the deliveries data for all matches.
 * @returns {Object} - An object containing the count of balls and runs for each bowler in the given match.
 * @returns {}  An empty object if their is any error.
 */
function bowlersRunWithNumOfBalls(matchIdOfYear, deliveries) {
    try {
        let bowlersRunWithCountOfBalls = deliveries.reduce((acc, delivery) => {
            let matchId = delivery.match_id;
            if (matchIdOfYear.hasOwnProperty(matchId)) {
                let bowler = delivery.bowler;
                let wide_runs = parseInt(delivery.wide_runs);
                let total_runs = parseInt(delivery.total_runs);
                let bye_runs = parseInt(delivery.bye_runs);
                let legbye_runs = parseInt(delivery.legbye_runs);
                let penalty_runs = parseInt(delivery.penalty_runs);
                let noball_runs = parseInt(delivery.noball_runs);


                let runs = total_runs - bye_runs - legbye_runs - penalty_runs;
                let balls = (wide_runs === 0 && noball_runs === 0) ? 1 : 0;

                if (acc[bowler] === undefined) {
                    acc[bowler] = {};
                }
                acc[bowler]['balls'] = (acc[bowler]['balls'] || 0) + balls;
                acc[bowler]['runs'] = (acc[bowler]['runs'] || 0) + runs;
            }
            return acc;
        }, {});
        return bowlersRunWithCountOfBalls;
    } catch (err) {
        console.log(err);
        return {};
    }
}


/**
 * Returns an object containing the top 10 economical bowlers based on the runs and balls data for each bowler.
 * @param {Object} bowlersRunAndBalls - An object containing the count of runs and balls for each bowler.
 * @returns {Object} - An object containing the top 10 economical bowlers and their economy rate.
 * @returns {}  An empty object if their is any error.
 */
function topTenEconomicalBowler(bowlersRunAndBalls) {
    try {
        let bowlerList = Object.keys(bowlersRunAndBalls);
        let bowlerWithEconomy = bowlerList.reduce((acc, bowler) => {
            acc[bowler] = Math.round((bowlersRunAndBalls[bowler]['runs'] / bowlersRunAndBalls[bowler]['balls']) * 6 * 100) / 100;
            return acc
        }, {});
        let tenEconomicalBowler = selectTopsortObject(bowlerWithEconomy, 10);
        return tenEconomicalBowler
    } catch (err) {
        console.log(err);
        return {};
    }
}



// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '4-Top-10-economical-bowlers-in-the-year-2015.json');

Promise.all([matchesData, deliveriesData]).then(([matches, deliveries]) => {
    let matchIdOfYear = getMatchIdOfYear(matches, 2015);
    let bowlersRunAndBalls = bowlersRunWithNumOfBalls(matchIdOfYear, deliveries);
    let tenEconomicalBowler = topTenEconomicalBowler(bowlersRunAndBalls);
    console.log(tenEconomicalBowler);
    writeFile(OutputPath, tenEconomicalBowler);  // Writing the output to a JSON file    
});

