const matches = require('../../matches');

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
        return totalMatchesPlayedPerYear
    } catch (err) {
        return {};
    }
}


console.log(countMatchesPerSeason(matches));