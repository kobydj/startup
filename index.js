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
apiRouter.get('/plant', (_req, res) => {
  console.log("getting plants")
  res.send(plantType);
});

apiRouter.post('/plant', (req, res) => {
  plantType = req.body.name;
  console.log(req.body);
  updateGarden(req.body, garden);
  res.send(plantType);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

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