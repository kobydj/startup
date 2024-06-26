import React from 'react';
import './info.css';

export function WeatherUpdates(){
    const [weatherAlert, setWeatherAlert] = React.useState('');

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
                    //weatherNote.removeChild(weatherNote.firstChild);
                    const alertColor = document.querySelector('#freeze-alert');
                    if(weather < 32) {
                        alertColor.classList.remove('alert-success');
                        alertColor.classList.add('alert-danger');
                
                        setWeatherAlert(`UPCOMING FREEZE!! TEMP: ${weather}\u00B0 F `);
                    }else{
                        alertColor.classList.remove('alert-danger');
                        alertColor.classList.add('alert-success');
                
                        setWeatherAlert(`Todays Temp: ${weather}\u00B0 F `)
                    }
                });
            });
        });
    } else {
            console.log("Geolocation is not supported by this browser.");
    }

    return(
        <div id="freeze-alert" className="alert alert-success"> 
            <p>Weather alerts : </p>
            <ul id="weather-alert">{weatherAlert}
            </ul>
        </div>
    );
}