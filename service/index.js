const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');


const app = express();
const authCookieName = 'token';


// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());
app.use(cookieParser()); 
app.set('trust proxy', true);

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);
// authorization endpoints
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.userName)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.userName, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.userName);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      console.log("logged in")
      return;
    }
  }
  
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.get('/user/:username', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
    const token = req?.cookies.token;
    res.send({ userName: user.userName, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


// all planting endpoints are secure
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

let plantType 
let garden = [];
let dates = [];
let userName;
secureApiRouter.get('/plant-type', (_req, res) => {
  console.log("getting plant type")
  res.send(plantType);
});

secureApiRouter.get('/plant', async (_req, res) => {
  console.log("getting plant")
  
  let plantJson = await DB.getPlant(plantType)
  if(plantJson){
    res.send(plantJson);
  }else{
    plantJson = getPlantFromGarden(plantType);
    res.send(plantJson);
  }
});

secureApiRouter.post('/plant', async (req, res) => {
  plantType = req.body.name;
  console.log(req.body);
  const plant = await DB.getPlant(plantType);
  if (plant) {
    res.send(plantType);
  }else{
    updateGarden(req.body, garden);
    const plant = await DB.createPlant(req.body);
    res.send(plantType);
  }
});

secureApiRouter.get('/date', (_req, res) => {
  console.log("getting dates");
  let dateJson =  DB.getDate(plantType, userName);
  if(dateJson){
    res.send(dateJson);
  }else{
    let dateJson = getDate(plantType);
    res.send(dateJson);
  }
});

secureApiRouter.post('/date', async (req, res) => {
  console.log(req.body);
  updateDates(req.body, dates);
  userName = req.body.userName;
  const tempDate = await DB.getDate(plantType, userName);
  if (tempDate) {
    const date = await DB.updateDate(req.body)
    
    res.send(plantType);
  }else{
    const date = await DB.createDate(req.body);
    res.send(plantType);
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


// authorization helper functions
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


// planting helper functions
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

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);