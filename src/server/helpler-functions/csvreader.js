const csv = require('csvtojson');
const path = require('path');


function readCsvFile(pathToFile) {
    return csv().fromFile(pathToFile);
}



let pathToMatches = path.resolve(__dirname, '..', '..', 'data', 'matches.csv');
let pathToDeliveries = path.resolve(__dirname, '..', '..', 'data', 'deliveries.csv');


const matchesData = readCsvFile(pathToMatches);
const deliveriesData = readCsvFile(pathToDeliveries);


module.exports = { matchesData, deliveriesData };

