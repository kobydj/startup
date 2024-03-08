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


  function plantInfo() {

  }
class plantdates{
    constructor() {
        const startDate = document.querySelector('#start-date');
        startDate.value = getStartDate();
        console.log(startDate.value);
        const germination = document.querySelector('#avg-germination');
        germination.textContent = localStorage.getItem(localStorage.getItem('plant-type') + "-germination");
        const plantType = document.querySelector('#plant-type');
        plantType.textContent = localStorage.getItem('plant-type');

        setFinishDate();
    }
}
new plantdates();
new weatherUpdates();

  function setDate() {
    const dateEl = document.querySelector("#start-date");
    console.log(dateEl.value);
    localStorage.setItem(localStorage.getItem('plant-type') + "-start", JSON.stringify(dateEl.value));
    setFinishDate();
  }

  function setFinishDate() {
    let harvestDate = new Date(getStartDate());
    console.log(harvestDate);

    daysToAdd = Number(JSON.parse(localStorage.getItem(localStorage.getItem('plant-type') + "-grow-time")));
    harvestDate.setDate(harvestDate.getDate() + daysToAdd);
    console.log(typeof(daysToAdd));
    console.log(harvestDate.getDate());
    console.log(harvestDate);

    const harvestDateEl = document.querySelector('#finish-date');
    harvestDateEl.textContent = harvestDate.toLocaleDateString();
  }

  function getStartDate() {
    console.log("in getstartdate");

    let thisDate = localStorage.getItem(localStorage.getItem('plant-type') + "-start");
    console.log(thisDate);
    console.log(JSON.parse(thisDate));
    return JSON.parse(thisDate);
  }

  