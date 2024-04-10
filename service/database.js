const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('gardentimer');
const userCollection = db.collection('user');
const plantCollection = db.collection('plants');
const dateCollection = db.collection('dates');


(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(userName) {
  return userCollection.findOne({ userName: userName });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(userName, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userName: userName,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function createPlant(plant) {
  await plantCollection.insertOne(plant);
  return plant;
}

function getPlant(plantType) {
  return plantCollection.findOne({ name: plantType });
}

async function createDate(date) {
  await dateCollection.insertOne(date);
  return date;
}

async function updateDate(date) {
  await dateCollection.updateOne( {name: date.name, userName: date.userName}, {$set: date});
  return date;
}

function getDate(plantType, userName) {
  return dateCollection.findOne({ name: plantType, userName: userName});
}

module.exports = {
  getUser,
  getUserByToken,
  createUser, 
  createPlant,
  getPlant,
  createDate,
  updateDate,
  getDate
};