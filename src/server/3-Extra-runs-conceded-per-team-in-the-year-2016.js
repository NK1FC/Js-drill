
function getMatchIdOfYear(matches, year) {

    let matchIdOfYear = matches.reduce((acc, match) => {
        season = match.season;
        id = match.id;
        if (season === year) {
            acc[id] = season;
        }
        return acc;
    }, {});

    return matchIdOfYear;
}



function extraRunsConcededbyteams(matchIdOfYear, deliveries) {
    let runsConcededbyteams = deliveries.reduce((acc, delivery) => {
        match_id = delivery.match_id;
        if (matchIdOfYear.hasOwnProperty(match_id) === true) {
            team = delivery.bowling_team;
            runs = delivery.extra_runs;
            acc[team]=(acc[team] || 0) + runs;
        }
        return acc;
    })
    return runsConcededbyteams;
}



