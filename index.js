const express = require('express');
const app = express();


// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

let plantType 
let garden = [];
let dates = [];
apiRouter.get('/plant-type', (_req, res) => {
  console.log("getting plants")
  res.send(plantType);
});

apiRouter.get('/plant', (_req, res) => {
  console.log("getting plant")
  let plantJson = getPlantFromGarden(plantType);
  res.send(plantJson);
});

apiRouter.post('/plant', (req, res) => {
  plantType = req.body.name;
  console.log(req.body);
  updateGarden(req.body, garden);
  res.send(plantType);
});

apiRouter.get('/date', (_req, res) => {
  console.log("getting dates")
  let dateJson = getDate(plantType);
  res.send(dateJson);
});

apiRouter.post('/date', (req, res) => {
  console.log(req.body);
  updateDates(req.body, dates);
  res.send(plantType);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function getDate(plantType){
  let found = false;
  for (const [i, prevDate] of dates.entries()) {
    console.log(prevDate)
    if (plantType === prevDate.name) {
      found = true;
      return prevDate;
    }
  }
  if (!found) {
    console.log("unable to find Date");
      return "sorry";
   } 
  
}
function updateDates(newDate, dates) {
  let found = false;
  for (const [i, prevDate] of dates.entries()) {
    console.log(prevDate)
    if (newDate.name === prevDate.name) {
      found = true;
      dates.splice(i, 0, newDate);
      break;
    }
  }

  if (!found) {
    dates.push(newDate);
  }
  return dates;
}

function getPlantFromGarden(plantType){
  let found = false;
  for (const [i, prevPlant] of garden.entries()) {
    console.log(prevPlant)
    if (plantType === prevPlant.name) {
      found = true;
      return prevPlant;
    }
  }
  if (!found) {
    console.log("unable to find plant");
  } 
  
}
function updateGarden(newPlant, garden) {
  let found = false;
  for (const [i, prevPlant] of garden.entries()) {
    console.log(prevPlant)
    if (newPlant.name === prevPlant.name) {
      found = true;
      break;
    }
  }

  if (!found) {
    garden.push(newPlant);
  }
  return garden;
}