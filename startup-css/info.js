setInterval(() => {
    const weather = Math.floor(Math.random() * 3000) % 70;
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
  }, 5000)

  function plantInfo() {

  }
class plantdates{
    constructor() {
        const startDate = document.querySelector('#start-date');
        startDate.value = getStartDate();
        console.log(startDate.value);

        setFinishDate();
    }
}
new plantdates();

  function setDate() {
    const dateEl = document.querySelector("#start-date");
    console.log(dateEl.value);
    localStorage.setItem(localStorage.getItem('plant-type') + "-start", dateEl.value);
    setFinishDate()
  }

  function setFinishDate() {
    let harvestDate= getStartDate();
    console.log(harvestDate);

    const harvestDateEl = document.querySelector('#finish-date');
    harvestDateEl.textContent = harvestDate;
  }

  function getStartDate() {
    return localStorage.getItem(localStorage.getItem('plant-type') + "-start"); 
  }