const matches = require('../../matches');

function countMatchesEachSeason(matches) {
    try {
        let totalMatchesPlayedEachYear = matches.reduce((acc, match) => {
            let season = match.season;
            acc[season] = (acc[season] || 0) + 1;
            return acc;
        }, {})
        return totalMatchesPlayedEachYear
    } catch (err) {
        return {};
    } return {};
}


console.log(countMatchesEachSeason(matches));