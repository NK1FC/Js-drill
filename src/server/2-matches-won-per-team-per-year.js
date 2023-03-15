const matches = require('../../matches');



function matchesWonPerTeamPerYear(matches) {

    let gamesWonPerTeamPerYear = matches.reduce((acc, match) => {
        let season = match.season;
        let team = match.winner;
        acc[season] = (acc[season] || {})
        acc[season][team] = (acc[season][team] || 0) + 1;
        return acc;
    }, {})

    return gamesWonPerTeamPerYear;
}


console.log(matchesWonPerTeamPerYear(matches));