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
    try {
      // Get the latest high scores from the service
      const response = await fetch('/api/scores');
      plantType = await response.json();
      
      // Save the scores in case we go offline in the future
      localStorage.setItem('plant-type', plantType);    

    } catch {
      // If there was an error then just use the last saved scores
      plantType = localStorage.getItem('plant-type');

    }
    const startDate = document.querySelector('#start-date');
    startDate.value = getStartDate();
    console.log(startDate.value);
    const germination = document.querySelector('#avg-germination');
    germination.textContent = localStorage.getItem(plantType + "-germination");
    const plantText = document.querySelector('#plant-type');
    console.log(plantType.promiseResult)
    plantText.textContent = plantType;  
  }

  function setDate() {
    const dateEl = document.querySelector("#start-date");
    console.log(dateEl.value);
    localStorage.setItem(plantType + "-start", JSON.stringify(dateEl.value));
    setFinishDate();
  }

  function setFinishDate() {
    let harvestDate = new Date(getStartDate());
    console.log(harvestDate);

    daysToAdd = Number(JSON.parse(localStorage.getItem(plantType + "-grow-time")));
    harvestDate.setDate(harvestDate.getDate() + daysToAdd);
    console.log(typeof(daysToAdd));
    console.log(harvestDate.getDate());
    console.log(harvestDate);

    const harvestDateEl = document.querySelector('#finish-date');
    harvestDateEl.textContent = harvestDate.toLocaleDateString();
  }

  function getStartDate() {
    console.log("in getstartdate");

    let thisDate = localStorage.getItem(plantType + "-start");
    console.log(thisDate);
    console.log(JSON.parse(thisDate));
    return JSON.parse(thisDate);
  }

new plantdates();
new weatherUpdates();
  