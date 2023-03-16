
const { matchesData, deliveriesData } = require('./helpler-functions/csvreader'); // Importing Matches data and deliveries data
const writeFile = require('./helpler-functions/file-writer'); // Importing Function to write File
const getMatchIdOfYear = require('./helpler-functions/get-matchid-for-years');
const path = require('path');


/**
 * This function takes an array of match IDs for all years and an array of delivery objects as input. It calculates the total runs and balls faced by each batsman for each season, and returns an object containing this information grouped by season and batsman.
 * @param {Array} matchIdOfallYears - An array of match IDs for all years.
 * @param {Array} deliveries - An array of delivery objects containing information about the runs scored and balls faced by each batsman in each match.
 * @returns {Object} - An object containing the total runs and balls faced by each batsman for each season.
 * @returns {} An empty object if there is any error.
 */
function seasonalBatsmanRunsAndBalls(matchIdOfallYears, deliveries) {
    try {
        let seasonBatsmanRunsAndBalls = deliveries.reduce((acc, delivery) => {
            let matchId = delivery.match_id;
            let season = matchIdOfallYears[matchId];
            let batsman = delivery.batsman;
            let wide_runs = parseInt(delivery.wide_runs);
            let batsman_runs = parseInt(delivery.batsman_runs);

            if (acc[season] === undefined) {
                acc[season] = {};
            }
            if (acc[season][batsman] === undefined) {
                acc[season][batsman] = {};
                acc[season][batsman]['runs'] = 0;
                acc[season][batsman]['balls'] = 0;
            }

            acc[season][batsman]['runs'] = acc[season][batsman]['runs'] + batsman_runs;
            if (wide_runs === 0) {
                acc[season][batsman]['balls'] = acc[season][batsman]['balls'] + 1;
            }
            return acc;
        }, {});
        return seasonBatsmanRunsAndBalls;
    } catch (err) {
        console.log(err);
        return {};
    }
}


/**
 * This function takes an object containing the runs and balls faced by each batsman in each season, and calculates the strike rate of each batsman for each season.
 * @param {Object} seasonBatsmanRunsAndBalls - An object containing the runs and balls faced by each batsman in each season.
 * @returns {Object} - An object containing the strike rate of each batsman for each season.
 * @returns {} An empty object if there is any error.
 */
function batsmanStrikeRateEachSeason(seasonBatsmanRunsAndBalls) {
    try {
        let seasonBatsmanStrikeRate={};
        for(let season in seasonBatsmanRunsAndBalls){
            for(let player in seasonBatsmanRunsAndBalls[season]){
                if(seasonBatsmanStrikeRate[season]===undefined){
                    seasonBatsmanStrikeRate[season]={};
                }
                seasonBatsmanStrikeRate[season][player]=
                    (Math.round((seasonBatsmanRunsAndBalls[season][player]['runs']
                    /seasonBatsmanRunsAndBalls[season][player]['balls'])*10000))/100; 
            }
        }
        return seasonBatsmanStrikeRate;
    } catch (err) {
        console.log(err)
        return {};
    }
}





// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '7-strikerate-batsman-for-each-season.json');

Promise.all([matchesData, deliveriesData]).then(([matches, deliveries]) => {
    let matchIdOfAllYears = getMatchIdOfYear(matches);
    let seasonBatsmanRunsAndBalls = seasonalBatsmanRunsAndBalls(matchIdOfAllYears, deliveries);
    let seasonBatsmanStrikeRate = batsmanStrikeRateEachSeason(seasonBatsmanRunsAndBalls);
    console.log(seasonBatsmanStrikeRate);
    writeFile(OutputPath, seasonBatsmanStrikeRate);  // Writing the output to a JSON file    
});

