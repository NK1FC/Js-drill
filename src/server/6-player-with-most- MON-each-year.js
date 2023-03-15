

const { matchesData } = require('./csvreader'); // Importing Matches data
const writeFile = require('./file-writer'); // Importing Function to write File
const path = require('path');

/**
 * This function takes an array of matches as input, where each match object contains information about the season and the player who was awarded the "player of the match" award.
 * The function then processes this data to determine which player received the most "player of the match" awards for each season, and returns an object containing this information.
 * @param {Array} matches - An array of match objects, where each match object has a 'season' and 'player_of_match' property.
 * @returns {Object} - An object containing the player with the most player of the match awards for each season.
 * @returns {}  An empty object if their is any error.  
*/
function playerWithMostMotm(matches) {
    try{
    // Create an object to keep track of how many player of the match awards each player has received for each season
    let playerWithMotmCountEachSeason = matches.reduce((acc, match) => {
        let season = match.season;
        let player_of_match = match.player_of_match;

        // If the current season hasn't been seen before, create an empty object to keep track of the player of the match awards
        if (acc[season] === undefined) {
            acc[season] = {};
        }

        // Increment the player of the match count for the current player for the current season
        acc[season][player_of_match] = (acc[season][player_of_match] || 0) + 1;

        // Return the updated accumulator object
        return acc;
    }, {});

    // Get a list of all the years (seasons) for which data has been recorded
    const listOfYears = Object.keys(playerWithMotmCountEachSeason);

    // Create an object to keep track of the player with the most player of the match awards for each season
    let playerWithMostMotmPerSeason = listOfYears.reduce((acc, year) => {
        // If the current year hasn't been seen before, create an empty array to keep track of the player(s) with the most player of the match awards
        if (acc[year] === undefined) {
            acc[year] = [];
        }

        // Get an array of the number of player of the match awards for each player for the current season
        const numberOfPotm = Object.values(playerWithMotmCountEachSeason[year]);

        // Find the maximum number of player of the match awards for the current season
        maxMotm = Math.max(...numberOfPotm);

        // Loop through each player for the current season and add them to the list of players with the most player of the match awards if they have the maximum number of awards
        Object.entries(playerWithMotmCountEachSeason[year]).forEach(([player, motm]) => {
            if (motm === maxMotm) {
                acc[year].push(player);
            }
        })

        // Return the updated accumulator object
        return acc;
    }, {});

    // Return the object containing the player with the most player of the match awards for each season
    return playerWithMostMotmPerSeason;
} catch (err){
    console.log(err);
    return {};
}
}


// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '6-player-with-most-MON-each-year.json');

matchesData.then((matches) => {

    let playerWithMostMotmPerSeason = playerWithMostMotm(matches); 
    console.log(playerWithMostMotmPerSeason);
    writeFile(OutputPath, playerWithMostMotmPerSeason);  // Writing the output to a JSON file

});
