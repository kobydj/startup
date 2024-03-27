class weatherUpdates {
  constructor(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
        .then((x) => x.json())
        .then((response) => {
          fetch(response.properties.forecast)
          .then((x) => x.json())
          .then((response) => {
              let weather = response.properties.periods[1].temperature
              console.log(`temp tonight: ${weather}`);
              const weatherNote = document.querySelector('#weather-alert');
              weatherNote.removeChild(weatherNote.firstChild);
              const alertColor = document.querySelector('#freeze-alert');
              if(weather < 32) {
                  alertColor.classList.remove('alert-success');
                  alertColor.classList.add('alert-danger');
          
                  weatherNote.innerHTML =
                  `<li> UPCOMING FREEZE!! TEMP: ${weather}\u00B0 F </li>` +
                  weatherNote.innerHTML;
              }else{
                  alertColor.classList.remove('alert-danger');
                  alertColor.classList.add('alert-success');
          
                  weatherNote.innerHTML =
                  `<li> none </li>` +
                  weatherNote.innerHTML;
              }
          });
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
}

let plantType 
class plantdates{
     constructor() {
      const user = confirmLogin();
    }
}
async function confirmLogin(){
  const response = await fetch(`/api/user/${localStorage.getItem('userName')}` );
  if(!response.ok){
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Please login to view your notifications`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
  }else{
    getPlant();
  }
}

function goBack() {
  window.location.href = 'index.html';
}

async function getPlant() {
    console.log("getplant")
    try {
      console.log("trying")
      const response = await fetch('/api/plant-type');
      plantType = await response.json();
      localStorage.setItem('plant-type', plantType);    

    } catch {
      plantType = localStorage.getItem('plant-type');

    }    
    const plantText = document.querySelector('#plant-type');
    plantText.textContent = JSON.parse(plantType);

    try {
      const response = await fetch('/api/plant');
      const plantText = await response.json();
      
      const germination = document.querySelector('#avg-germination');
      germination.textContent = plantText.germination;
    } catch {
      const germination = document.querySelector('#avg-germination');
      germination.textContent = localStorage.getItem(plantType + "-germination");
    }
    getStartDate();
}

async function setDate() {
    const dateEl = document.querySelector("#start-date");
    console.log("dateEl value: " + dateEl.value);
    const newDate = {name: JSON.parse(plantType), date: dateEl.value, userName : localStorage.getItem('userName') };
    try{
      const response = await fetch('/api/date', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: (JSON.stringify(newDate)),
      });
      localStorage.setItem(plantType + "-start", JSON.stringify(dateEl.value));
    }catch{
      localStorage.setItem(plantType + "-start", JSON.stringify(dateEl.value));
    }
    let harvestDate = new Date(dateEl.value);
    console.log(harvestDate);
    try {
      const response = await fetch('/api/plant');
      const plantText = await response.json();
      let daysToAdd = Number(JSON.parse(plantText.season));
      harvestDate.setDate(harvestDate.getDate() + daysToAdd);
      console.log("days to add" + typeof(daysToAdd));
      console.log(harvestDate.getDate());
      console.log(harvestDate);
    } catch {
      let daysToAdd = Number(JSON.parse(localStorage.getItem(plantType + "-grow-time")));
      harvestDate.setDate(harvestDate.getDate() + daysToAdd);
      console.log(typeof(daysToAdd));
      console.log(harvestDate.getDate());
      console.log(harvestDate);
    }
    const harvestDateEl = document.querySelector('#finish-date');
    harvestDateEl.textContent = harvestDate.toLocaleDateString();
}

async function getStartDate() {
    console.log("in getstartdate");
    let thisDate;
    let harvestDate;
    try {
      const response = await fetch('/api/date');
      const dateText = await response.json();
      thisDate = JSON.parse(dateText.date);
      console.log(thisDate);
      const startDate = document.querySelector('#start-date');
      startDate.value = JSON.parse(thisDate);
      harvestDate = new Date(JSON.parse(thisDate));  
    } catch {
      defaultDate = localStorage.getItem(plantType + "-start");
      console.log(defaultDate);
      const startDate = document.querySelector('#start-date');
      startDate.value = JSON.parse(defaultDate); 
      harvestDate = new Date(JSON.parse(defaultDate))
    }

    console.log(harvestDate);

    try {
      const response = await fetch('/api/plant');
      const plantText = await response.json();
      let daysToAdd = Number(JSON.parse(plantText.season));
      harvestDate.setDate(harvestDate.getDate() + daysToAdd);
      console.log("days to add" + typeof(daysToAdd));
      console.log(harvestDate.getDate());
      console.log(harvestDate);
    } catch {
      let daysToAdd = Number(JSON.parse(localStorage.getItem(plantType + "-grow-time")));
      harvestDate.setDate(harvestDate.getDate() + daysToAdd);
      console.log(typeof(daysToAdd));
      console.log(harvestDate.getDate());
      console.log(harvestDate);
    }
    const harvestDateEl = document.querySelector('#finish-date');
    harvestDateEl.textContent = harvestDate.toLocaleDateString();
}
new plantdates();
new weatherUpdates();

class waterUpdate{
  socket;
  constructor() {
    this.configureWebSocket();

  }

  configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.displayMsg('system', 'game', 'connected');
    };
    this.socket.onclose = (event) => {
      this.displayMsg('system', 'game', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
      } else if (msg.type === GameStartEvent) {
        this.displayMsg('player', msg.from, `started a new game`);
      }
    };
  }
  
  displayMsg(msg) {
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `${msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
  
  broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }
}