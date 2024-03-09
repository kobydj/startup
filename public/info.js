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
        getPlant();
    }
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
    console.log(dateEl.value);
    const newDate = {name: JSON.parse(plantType), date: dateEl.value};
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
    setFinishDate();
  }

  async function setFinishDate() {
    let harvestDate = new Date(getStartDate());
    console.log(harvestDate);
    try {
      const response = await fetch('/api/plant');

      const plantText = await response.json();
      let daysToAdd = Number(JSON.parse(plantText.season));
      harvestDate.setDate(harvestDate.getDate() + daysToAdd);
      console.log(typeof(daysToAdd));
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
    try {
      const response = await fetch('/api/date');
      const dateText = await response.json();
      thisDate = JSON.parse(JSON.parse(dateText.date));
      console.log(thisDate);
      const startDate = document.querySelector('#start-date');
      startDate.value = JSON.parse(thisDate); 
    } catch {
      defaultDate = localStorage.getItem(plantType + "-start");
      console.log(defaultDate);
      const startDate = document.querySelector('#start-date');
      startDate.value = JSON.parse(defaultDate); 
    }
  }

new plantdates();
new weatherUpdates();
  