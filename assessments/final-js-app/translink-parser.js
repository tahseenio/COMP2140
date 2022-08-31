const fetch = require('node-fetch');
const fs = require('fs');

/**
 * This function fetches data asynchronously based on the URL provided.
 * @async
 * @param {string} url - the URL to fetch data from (expecting JSON).
 * @returns {string} the JSON response.
 */
const fetchData = async (url) => {
  const response = await fetch(url);
  const responseJSON = await response.json();
  return responseJSON;
  // console.log('RESPONSE', responseJSON);
};

/**
 * This function will save a JSON cache file with the specified filename & data.
 * @async
 * @param {string} path - The string to append to the JSON filename.
 * @param {string} data - The string containing JSON data to save.
 */
const saveCache = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('File written successfully to: ', path);
    }
  });
};

/**
 * Fetches relevant data (trip_updates, vehicle_positions, alerts) from proxy and saves to local cache
 * @async
 */
const combineFetches = async () => {
  const tripUpdates = await fetchData(
    'http://127.0.0.1:5343/gtfs/seq/trip_updates.json'
  );
  await saveCache('./cached-data/trip_updates.json', tripUpdates);

  const vehiclePositions = await fetchData(
    'http://127.0.0.1:5343/gtfs/seq/vehicle_positions.json'
  );
  await saveCache('./cached-data/vehicle_positions.json', vehiclePositions);

  const alerts = await fetchData('http://127.0.0.1:5343/gtfs/seq/alerts.json');
  await saveCache('./cached-data/alerts.json', alerts);
};

/**
 * Starts updating local cache every 5 minutes
 */
const startCaching = () => {
  combineFetches();
  console.log(
    'Initial Cache Refreshed!',
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  );

  const minutes = 5;
  const secondsInMinute = 60;
  const millisecondsInSecond = 1000;
  const cacheDelayTime = minutes * secondsInMinute * millisecondsInSecond;

  setTimeout(() => {
    startCaching();
  }, cacheDelayTime);
};
startCaching();

// ************************************************************************************ //
// ************************************************************************************ //
// ************************************************************************************ //
// ************************************************************************************ //
// ************************************************************************************ //
// ************************************************************************************ //
// ************************************************************************************ //

// https://mattluscombe.notion.site/JavaScript-Functional-Programming-Assessment-Brief-7790ff9b78834d2da21c05495cd30a4a

// https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-seq/resource/be7f19e5-3ee8-4396-b9eb-46f6b4ce8039
// TODO Understand what the files I have downloaded mean.

// const fs = require('fs');
// const prompt = require('prompt');
// const { parse } = require('csv-parse/sync');

// console.log(parse('Hello,world\n1,2'));

// const readData = () => {
//   fs.readFile('./cached-data/trip_updates.json', (err, data) => {
//     if (err) throw err;
//     let tripUpdates = JSON.parse(data);
//   });
// };
// // readData();

// // After running the server application, this will load a JSON version of SEQ Alerts (originally in Protobuf format).

// prompt.start();

// console.log('Welcome to the UQ Lakes station bus tracker!');

// const schema = {
//   properties: {
//     date: {
//       description: 'What date will you depart UQ Lakes station by bus?',
//       pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
//       message: 'Please enter in ISO 8601 format (YYYY-MM-DD)',
//       required: true,
//     },
//     time: {
//       description: 'What time will you depart UQ Lakes station by bus?',
//       pattern: /^(0?[1-9]|1[0-2]):[0-5][0-9]$/,
//       message: 'Please enter in ISO 8601 format (HH:mm)',
//       required: true,
//     },
//   },
// };

// FOR TIME MIGHT TRY BELOW. basically this one doesnt allow optional zero
// ^([0-1][0-9]|[2][0-3]):([0-5][0-9])$

//
// Get two properties from the user: name, password
//

/////////////////////////////////////////
/*
prompt.get(schema, (err, result) => {
  //
  // Log the results.
  //
  console.log('Command-line input received:');
  console.log('  date: ' + result.date);
  console.log('  time: ' + result.time);
});
*/
////////////////////////////////////////////

// Once date and time inputs are validated run rest of main code below

// After the prompts are validated against the expected values, parse & output at least the following
// for each result that is scheduled to arrive less than 10 minutes from the current time:

// find buses scheduled to arrive <10mins from current time given.
// - GET SHORT AND LONG NAME OF ROUTE
// - GET SERVICE ID OF TRIP
// - GET HEAD SIGN FOR THE TRIP (aka destination sign https://en.wikipedia.org/wiki/Destination_sign)
// - GET SCHEDULED ARRIVAL TIME OF VEHICLE
// - GET LIVE ARRIVAL TIME OF THE VEHICLE. maybe use trip_updates.json
// - LIVE GEOGRAPHIC POS of vehicle. vehicle_positions.json to find vehicle longitude and latitude. Needs "id" value which idk what it is
// const getBuses = async () => {
//   fs.readFile('./cached-data/trip_updates.json', (err, data) => {
//     if (err) throw err;
//     let tripUpdates = JSON.parse(data);
//     console.log(tripUpdates);
//   });
// };
// getBuses();

// fs.createReadStream('./static-data/calendar.txt')
//   .pipe(parse())
//   .on('data', (row) => {
//     console.log(row);
//     fs.writeFileSync('./cached-data/test.json', JSON.stringify(row));
//   });

// Thanks for using the UQ Lakes station bus tracker!
// const restartRequest = prompt('Would you like to search again?');

// console.log('Thanks for using the UQ Lakes station bus tracker!');
