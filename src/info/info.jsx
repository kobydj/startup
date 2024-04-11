import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './info.css';

export function Info() {
    const navigate = useNavigate();

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
      
      let plantType ;
      let socket;
      class plantdates{
           constructor() {
            const user = confirmLogin();
            if(socket){
              const buttonEl = document.querySelector('.water-button');
              buttonEl.style.display = 'none';
            }
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
            if(socket){
              broadcastEvent(localStorage.getItem('userName'), 'plantingTime', new Date(newDate.date).toLocaleDateString(), newDate.name)
            }
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

    function waterReminder(){
        new waterUpdate();
      }
      class waterUpdate{
        constructor() {
          this.configureWebSocket();
          const buttonEl = document.querySelector('.water-button');
          buttonEl.style.display = 'none';
      
        }
      
        configureWebSocket() {
          const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
          socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
          socket.onopen = (event) => {
            this.displayMsg('You\'re signed up!');
          };
          socket.onclose = (event) => {
            this.displayMsg('You have been disconnected from reminders');
            const buttonEl = document.querySelector('.water-button');
            buttonEl.style.display = 'grid';
          };
          socket.onmessage = async (plantingEvent) => {
            const msg = JSON.parse(await plantingEvent.data);
            if (msg.type === 'watering') {
              this.displayMsg('Don\'t forget to water today!');
            } else if (msg.type === 'plantingTime') {
              this.displayMsg( msg.from + ' changed their planting date for ' + msg.plant + '\'s to ' + msg.date );
            }
          };
        }
        
        displayMsg(msg) {
          const modalEl = document.querySelector('#wsMsgModal');
          modalEl.querySelector('#wsModal-body').textContent = `${msg}`;
          const msgModal = new bootstrap.Modal(modalEl, {});
          msgModal.show();
        }
        
      
      }
      function broadcastEvent(from, type, date, plant) {
        const plantingEvent = {
          from: from,
          type: type,
          date: date,
          plant: plant,
        };
        socket.send(JSON.stringify(plantingEvent));
      }
  return (
    <main className='container-fluid text-dark text-center'>
        <div>
            <h3>See your notifications here</h3>
            <div id="freeze-alert" className="alert alert-success"> 
            <p>Weather alerts : </p>
            <ul id="weather-alert">
            </ul>
            </div>
            
            <div id= "plant-alerts" className="alert">
            <p>Plant information <span id= "plant-type"></span></p>
            <ul>
            <li id="germination-time">days to germination : <span id= "avg-germination"></span></li>
                <li>Planting date : <input id="start-date" className= "input-group date" type= "date"  min="2024-01-01" max="2024-12-31" value="2024-01-01" onChange={()=> setDate()}></input></li>
                <li  type="date">Harvest date : <span id="finish-date"></span></li>
            </ul>
            </div>
            <aside>        
            <p className="water-button">
                Click for daily watering reminders, and to share your planting dates <Button variant="success " onClick={()=> waterReminder()} >Subscribe</Button>
            </p>
            </aside>
            <aside className="return">        
            <p>
                Return to 
                <Button variant='success' onClick={() => navigate('/garden')}> Garden </Button>
            </p>
            </aside>
        </div>
    </main>
  );
}