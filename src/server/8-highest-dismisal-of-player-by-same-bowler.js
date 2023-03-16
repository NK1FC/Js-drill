const { deliveriesData } = require('./helpler-functions/csvreader'); // Importing Matches data and deliveries data
const writeFile = require('./helpler-functions/file-writer'); // Importing Function to write File
const selectTopsortObject = require('./helpler-functions/sort-and-slice-object');
const path = require('path');

/**
 * This function takes an array of deliveries and returns the player with the highest dismissal count and the bowler with the highest dismissal count for that player.
 * @param {Array} deliveries An array of delivery objects.
 * @returns {Object} An object with the player name as the key and the bowler with the highest dismissal count as the value.
 * @returns {}  An empty object if their is any error.
 */
function highestDismissedPlayerByParticularBowler(deliveries) {
    try {
        //  Create an object to store the count of dismissals for each player by each bowler
        const dismissedPlayerBowlerCount = deliveries.reduce((acc, delivery) => {
            let dismissal_kind = delivery.dismissal_kind;
            // Exclude deliveries where the dismissal_kind is not a valid dismissal type
            if (dismissal_kind !== '' && dismissal_kind !== 'run out'
                && dismissal_kind !== 'retired hurt' && dismissal_kind !== 'obstructing the field') {
                let player_dismissed = delivery.player_dismissed;
                let bowler = delivery.bowler;
                acc[player_dismissed] = (acc[player_dismissed] || {});
                acc[player_dismissed][bowler] = (acc[player_dismissed][bowler] || 0) + 1;
            }
            return acc;
        }, {});

        //  Convert the object into an array of arrays, with each array containing the player name and their dismissal count by each bowler
        let listDismissedPlayerBowlerCount = Object.entries(dismissedPlayerBowlerCount);

        //  For each player, select the bowler with the highest dismissal count and return it as an object
        let listDismissedPlayerBowlerMaxCount = listDismissedPlayerBowlerCount.map((current) => {
            return [current[0], selectTopsortObject(current[1], 1, true)];
        });

        //  Sort the array of players by their highest dismissal count, in descending order
        const sortListDismissedPlayerBowlerCount = listDismissedPlayerBowlerMaxCount.sort((a, b) => {
            return Object.entries(b[1])[0][1] - Object.entries(a[1])[0][1];
        });

        //  Return the player with the highest dismissal count and the bowler with the highest dismissal count for that player
        const listMostDismissedPlayer = sortListDismissedPlayerBowlerCount[0];

        let mostDismissedPlayer = {};

        mostDismissedPlayer[listMostDismissedPlayer[0]] = listMostDismissedPlayer[1];

        return mostDismissedPlayer;

    } catch (err) {
        console.log(err);
        return {};
    }
}


// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '8-highest-dismisal-of-player-by-same-bowler.json');

deliveriesData.then((deliveries) => {

    let mostDismissedPlayer = highestDismissedPlayerByParticularBowler(deliveries);
    console.log(mostDismissedPlayer);
    // console.log(topEconomicalBowlerSuperOver);
    writeFile(OutputPath, mostDismissedPlayer);  // Writing the output to a JSON file

});

