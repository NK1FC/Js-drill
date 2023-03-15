const { matchesData } = require('./helpler-functions/csvreader'); // Importing Matches data
const writeFile = require('./helpler-functions/file-writer'); // Importing Function to write File
const path = require('path');

/**
 * Returns an object containing the count of matches won and also the toss by each team.
 * @param {Array} matches - An array of match objects.
 * @returns {Object} - An object containing the count of matches won by each team who won the toss.
 * @returns {}  An empty object if their is any error.
 */
function countWonTossAndMatchPerTeam(matches) {
    try {
        let countWonTossAndMatchEachTeam = matches.reduce((acc, match) => {

            let toss_winner = match.toss_winner;
            let winner = match.winner;
            if (winner !== '' && toss_winner !== '') {
                acc[winner] = (acc[winner] || 0) + (winner === toss_winner ? 1 : 0);
            }
            return acc;
        }, {});
        return countWonTossAndMatchEachTeam;
    } catch (err) {
        console.log(err);
        return {};
    }
}


// Executing the Code

let OutputPath = path.resolve(__dirname, '..', 'public', '5-count-each-team-won-the-toss-and-the-match.json');

matchesData.then((matches) => {

    const countWonTossAndMatchEachTeam= countWonTossAndMatchPerTeam(matches);  // Counting the matches per year
    console.log(countWonTossAndMatchEachTeam);
    writeFile(OutputPath, countWonTossAndMatchEachTeam);  // Writing the output to a JSON file

});
