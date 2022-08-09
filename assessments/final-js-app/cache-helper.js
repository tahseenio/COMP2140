const fetch = require('node-fetch');
const fs = require('fs');
const exec = require('child_process').execFile;

// TODO: add correct commenting

// URL
// Description

// http://127.0.0.1:5343/gtfs/seq/trip_updates.json
// After running the server application, this will load a JSON version of SEQ Trip Updates (originally in Protobuf format).
const fetchTripUpdates = async () => {
  const promise = await fetch(
    'http://127.0.0.1:5343/gtfs/seq/trip_updates.json'
  );
  const data = await promise.json();
  fs.writeFileSync('./cached-data/trip_updates.json', JSON.stringify(data));
};

// http://127.0.0.1:5343/gtfs/seq/vehicle_positions.json
// After running the server application, this will load a JSON version of SEQ Vehicle Positions (originally in Protobuf format).
const fetchVehiclePositions = async () => {
  const promise = await fetch(
    'http://127.0.0.1:5343/gtfs/seq/vehicle_positions.json'
  );
  const data = await promise.json();
  fs.writeFileSync(
    './cached-data/vehicle_positions.json',
    JSON.stringify(data)
  );
};

// http://127.0.0.1:5343/gtfs/seq/alerts.json
const fetchAlerts = async () => {
  const promise = await fetch('http://127.0.0.1:5343/gtfs/seq/alerts.json');
  const data = await promise.json();
  fs.writeFileSync('./cached-data/alerts.json', JSON.stringify(data));
};

const startProxy = () => {
  // Proxy start + first initial cached data loaded
  try {
    console.log('Started proxy server');
    exec('proxy.exe');
    fetchTripUpdates();
    fetchVehiclePositions();
    fetchAlerts();
    console.log(
      'Initial Cache Refreshed!',
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
  } catch (err) {
    console.log(err);
  }
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
