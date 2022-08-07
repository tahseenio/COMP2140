// https://mattluscombe.notion.site/JavaScript-Functional-Programming-Assessment-Brief-7790ff9b78834d2da21c05495cd30a4a

// https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-seq/resource/be7f19e5-3ee8-4396-b9eb-46f6b4ce8039
// TODO Understand what the files I have downloaded mean.

const readData = () => {
  fs.readFile('./cached-data/trip_updates.json', (err, data) => {
    if (err) throw err;
    let tripUpdates = JSON.parse(data);
    console.log(tripUpdates);
  });
};
// readData();

// After running the server application, this will load a JSON version of SEQ Alerts (originally in Protobuf format).
// const prompt = require('prompt');
// const csvParse = require('csv-parse');

// prompt.start();

// console.log('Welcome to the UQ Lakes station bus tracker!');

// prompt.get(['username', 'email'], (err, result) => {
//   //
//   // Log the results.
//   //
//   console.log('Command-line input received:');
//   console.log('  username: ' + result.username);
//   console.log('  email: ' + result.email);
// });

/*
// Year, month & day in ISO 8601 format (YYYY-MM-DD)
const departDate = prompt('What date will you depart UQ Lakes station by bus?');

// Hour & minutes in 24 hour time in ISO 8601 format (HH:mm)
const departTime = prompt('What time will you depart UQ Lakes station by bus?');

// Once date and time inputs are validated run rest of main code below

// Thanks for using the UQ Lakes station bus tracker!
const restartRequest = prompt('Would you like to search again?');

console.log('Thanks for using the UQ Lakes station bus tracker!');
*/
