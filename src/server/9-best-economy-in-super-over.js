const { deliveriesData } = require('./helpler-functions/csvreader'); // Importing Matches data and deliveries data
const writeFile = require('./helpler-functions/file-writer'); // Importing Function to write File
const selectTopsortObject = require('./helpler-functions/sort-and-slice-object');
const path = require('path');



/**
 * Returns an object containing the count of balls and runs for each bowler, based on the deliveries data.
 * @param {Array} deliveries - An array of objects representing the deliveries data for all matches.
 * @returns {Object} - An object containing the count of balls and runs for each bowler.
 * @returns {}  An empty object if their is any error.
 */
function superOverBowlersRunBalls(deliveries) {
    try {
        let bowlersRunBalls = deliveries.reduce((acc, delivery) => {
            let superOver = delivery.is_super_over;
            if (superOver === '1') {
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

                return acc;
            }
            return acc;
        }, {});
        return bowlersRunBalls;
    } catch (err) {
        console.log(err);
        return {};
    }
}



/**
 * Returns an object containing the top economical bowlers based on the runs and balls data for each bowler.
 * @param {Object} bowlersRunAndBalls - An object containing the count of runs and balls for each bowler.
 * @returns {Object} - An object containing the top economical bowlers and their economy rate.
 * @returns {}  An empty object if their is any error.
 */
function topEconomicalBowlerOfSuperOver(bowlersRunAndBalls) {
    try {
        let bowlerList = Object.keys(bowlersRunAndBalls);
        let bowlerWithEconomy = bowlerList.reduce((acc, bowler) => {
            acc[bowler] = Math.round((bowlersRunAndBalls[bowler]['runs'] / bowlersRunAndBalls[bowler]['balls']) * 6 * 100) / 100;
            return acc;
        }, {});
        let topEconomicalBowlerinSuperOver = selectTopsortObject(bowlerWithEconomy, 1);
        return topEconomicalBowlerinSuperOver;
    } catch (err) {
        console.log(err);
        return {};
    }
}






// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '9-best-economy-in-super-over.json');

deliveriesData.then((deliveries) => {

    let bowlersRunBalls = superOverBowlersRunBalls(deliveries);
    let topEconomicalBowlerSuperOver = topEconomicalBowlerOfSuperOver(bowlersRunBalls);
    console.log(topEconomicalBowlerSuperOver);
    writeFile(OutputPath, topEconomicalBowlerSuperOver);  // Writing the output to a JSON file

});


