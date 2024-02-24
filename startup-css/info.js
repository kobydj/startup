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