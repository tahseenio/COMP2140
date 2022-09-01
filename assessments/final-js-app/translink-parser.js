// TODO
// - zip file up (js files, cache and real-time files)
// -exclude stop_times.txt
// - REMOVE ALL TODOS IN THE END

const fetch = require('node-fetch');
const fs = require('fs');
const prompt = require('prompt-sync')();
const { parse } = require('csv-parse');

/**
 * This function uses node-fetch to fetch the JSON response based on the URL given.
 * @async
 * @param {string} url - the URL to fetch data from (expecting JSON).
 * @returns {string} the JSON response.
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log(
      '\u001b[1;31m ERROR: Please ensure the proxy server is running before starting the translink-parser script.'
    );
  }
  // console.log('RESPONSE', responseJSON);
};

/**
 * This function will save a JSON cache file with the specified filename & data.
 * @async
 * @param {string} path - The location to store the stringified JSON data.
 * @param {string} data - The string containing JSON data to save.
 */
const saveCache = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      // console.log('File written successfully to: ', path);
    }
  });
};

/**
 * This function fetches relevant data (trip_updates, vehicle_positions, alerts) from proxy and saves to local cache
 * @async
 */
const combineFetches = async () => {
  const tripUpdates = await fetchData(
    'http://127.0.0.1:5343/gtfs/seq/trip_updates.json'
  );
  const tripUpdatesToCache = tripUpdates.entity;
  await saveCache('./cached-data/trip_updates.json', tripUpdatesToCache);

  const vehiclePositions = await fetchData(
    'http://127.0.0.1:5343/gtfs/seq/vehicle_positions.json'
  );
  const vehiclePositionsToCache = vehiclePositions.entity;
  await saveCache(
    './cached-data/vehicle_positions.json',
    vehiclePositionsToCache
  );

  const alerts = await fetchData('http://127.0.0.1:5343/gtfs/seq/alerts.json');
  const alertsToCache = alerts.entity;
  await saveCache('./cached-data/alerts.json', alertsToCache);
};

/**
 * This function starts the cache refresher which updates every 5 minutes
 */
const startCaching = () => {
  combineFetches();
  // console.log(
  //   'Cache Refreshed!',
  //   new Date().toLocaleDateString(),
  //   new Date().toLocaleTimeString()
  // );

  const minutes = 5;
  const secondsInMinute = 60;
  const millisecondsInSecond = 1000;
  const cacheDelayTime = minutes * secondsInMinute * millisecondsInSecond;

  setTimeout(() => {
    startCaching();
  }, cacheDelayTime);
};
// TODO: ENABLE STARTCACHING LINE BELOW WHEN READY TO SUBMIT
// startCaching();

/******************** STARTING USER PROMPT SECTION BELOW ********************/
/******************** STARTING USER PROMPT SECTION BELOW ********************/
/******************** STARTING USER PROMPT SECTION BELOW ********************/
/******************** STARTING USER PROMPT SECTION BELOW ********************/

/**
 * @type {string}
 */
let dateDeparting = '';
/**
 * @type {string}
 */
let timeDeparting = '';

/**
 * Prompts the user for the departue date.
 */
const promptForDate = () => {
  let counter = 0;
  dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  while (true) {
    dateDeparting = prompt(
      'What date will you depart UQ Lakes station by bus? '
    );
    if (dateRegex.test(dateDeparting)) {
      break;
    } else {
      if (counter === 2) {
        console.log(
          '\u001b[1;31m Error receiving input. Script will now exit \u001b[0m'
        );
        process.exit();
      }
      console.log(
        '\u001b[1;31m Please enter in ISO 8601 format (YYYY-MM-DD) \u001b[0m'
      );
      counter++;
    }
  }
};

/**
 * Prompts the user for the departue time.
 */
const promptForTime = () => {
  let counter = 0;
  timeRegex = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

  while (true) {
    timeDeparting = prompt(
      'What time will you depart UQ Lakes station by bus? '
    );
    if (timeRegex.test(timeDeparting)) {
      break;
    } else {
      if (counter === 2) {
        console.log(
          '\u001b[1;31m Error receiving input. Script will now exit \u001b[0m'
        );
        process.exit();
      }
      console.log(
        '\u001b[1;31m Please enter in ISO 8601 format (HH:mm) \u001b[0m'
      );
      counter++;
    }
  }
};

/**
 * Function that parses a file to an object.
 * @param {string} readPath - The location to store the stringified data.
 * @param {string} writePath - The string containing JSON data to save. //TODO REMOVE THIS
 * @param {requestCallback} [cb] - The callback that handles the response. //TODO MAYBE NOT NEED THIS IDK
 */
const readFile = (readPath, writePath, cb) => {
  let arr = [];
  fs.createReadStream(readPath)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', function (row) {
      console.log('finished row');
      arr = [...arr, row];
      saveCache(writePath, arr);
    })
    .on('end', function () {
      cb();
      console.log('finished reading and writing', readPath);
    })
    .on('error', function (error) {
      console.log(error.message);
    });
};

// readFile('./static-data/calendar.txt', './reads/calendar.json', () => {
//   console.log('Hi');
// });
// readFile('./static-data/calendar_dates.txt', './reads/calendar_dates.json');
// readFile('./static-data/routes.txt', './reads/routes.json');
// readFile('./static-data/calendar.txt', './reads/calendar.json');
// readFile('./static-data/shapes.txt', './reads/shapes.json');
// readFile('./static-data/stop_times.txt', './reads/stop_times.json');
// readFile('./static-data/stops.txt', './reads/stops.json');
// readFile('./static-data/trips.txt', './reads/trips.json');

// // After running the server application, this will load a JSON version of SEQ Alerts (originally in Protobuf format).

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

const restartRequest = () => {
  let restartPrompt = '';
  let counter = 0;
  const acceptableWords = ['yes', 'y', 'no', 'n'];

  while (true) {
    restartPrompt = prompt('Would you like to search again? ');
    if (acceptableWords.includes(restartPrompt.toLowerCase())) {
      if (
        restartPrompt.toLowerCase() === acceptableWords[0] ||
        restartPrompt.toLowerCase() === acceptableWords[1]
      ) {
        main();
      } else {
        console.log('Thanks for using the UQ Lakes station bus tracker!');
        process.exit();
      }
      break;
    } else {
      if (counter === 2) {
        console.log(
          '\u001b[1;31m Error receiving input. Script will now exit \u001b[0m'
        );
        process.exit();
      }
      console.log('\u001b[1;31m Invalid input. Please try again! \u001b[0m');
      counter++;
    }
  }
};

const main = () => {
  console.log('Welcome to the UQ Lakes station bus tracker!');
  promptForDate();
  promptForTime();
  console.log('USER SELECTED DATE AND TIME', dateDeparting, timeDeparting);
  restartRequest();
};

main();
