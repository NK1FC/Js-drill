
/**
 * Returns an object containing the match ID and corresponding season for all matches played in a given year.
 * @param {Array} matches - An array of match objects.
 * @param {Number} [year] - Optional. The year for which to return the matches.
 * @returns {Object} An object containing the match ID and corresponding season for all matches played in the given year.
 * @returns {} An empty object if there is any error.
 */
function getMatchIdOfYear(matches, year) {
    try {
        let matchIdOfYear = matches.reduce((acc, match) => {
            season = parseInt(match.season);
            id = match.id;
            if (arguments.length == 2) {
                if (season === year) {
                    acc[id] = season;
                }
            } else {
                acc[id]=season;
            }
            return acc;
        }, {});

        return matchIdOfYear;
    } catch (err) {
        console.log(err);
        return {};
    }
}



module.exports = getMatchIdOfYear;
