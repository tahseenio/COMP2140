const fetch = require('node-fetch');
const fs = require('fs');
const exec = require('child_process').execFile;

// URL
// Description

// http://127.0.0.1:5343/gtfs/seq/trip_updates.json
// After running the server application, this will load a JSON version of SEQ Trip Updates (originally in Protobuf format).
const fetchTripUpdates = async () => {
  const promise = await fetch(
    'http://127.0.0.1:5343/gtfs/seq/trip_updates.json'
  );
  const data = await promise.json();
  let savedData = JSON.stringify(data);
  fs.writeFileSync('./cached-data/trip_updates.json', savedData);
};

// http://127.0.0.1:5343/gtfs/seq/vehicle_positions.json
// After running the server application, this will load a JSON version of SEQ Vehicle Positions (originally in Protobuf format).
const fetchVehiclePositions = async () => {
  const promise = await fetch(
    'http://127.0.0.1:5343/gtfs/seq/vehicle_positions.json'
  );
  const data = await promise.json();
  let savedData = JSON.stringify(data);
  fs.writeFileSync('./cached-data/vehicle_positions.json', savedData);
};

// http://127.0.0.1:5343/gtfs/seq/alerts.json
const fetchAlerts = async () => {
  const promise = await fetch('http://127.0.0.1:5343/gtfs/seq/alerts.json');
  const data = await promise.json();
  let savedData = JSON.stringify(data);
  fs.writeFileSync('./cached-data/alerts.json', savedData);
};

const startProxy = () => {
  // Proxy start + first initial cached data loaded
  console.log('started proxy server');
  exec('proxy.exe', (err, stdout, stderr) => {
    if (err) throw err;
    console.log(stdout);
  });
  setTimeout(() => {
    fetchTripUpdates();
    fetchVehiclePositions();
    fetchAlerts();
    console.log(
      'Initial Cache Refreshed!',
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
  }, 300);
};
startProxy();

const minutes = 5;
const secondsInMinutes = 60;
const millisecondsInSeconds = 1000;
const cacheDelayTime = minutes * secondsInMinutes * millisecondsInSeconds;

setInterval(() => {
  console.log(
    'Refreshed Cache',
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  );
  fetchTripUpdates();
  fetchVehiclePositions();
  fetchAlerts();
}, cacheDelayTime);
