import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';
import {WeatherUpdates} from './weather';
import {PlantDates} from './date';


import './info.css';

export function Info(props) {
    const [displayError, setDisplayError] = React.useState(null);
    const [plantType, setPlantType] = React.useState(localStorage.getItem('plant') || '');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const navigate = useNavigate();
    
    async function makeDates(){
        try {
            const response = await fetch('/api/date');
            const dateText = await response.json();
            let thisDate = dateText.date;
            console.log(thisDate);
            let newDate = new Date(thisDate);
            //setStartDate(newDate.toLocaleTimeString);
            //newDate = new Date(thisDate);
            //newDate.setDate(newDate.getDate() + Number(JSON.parse(plantType).season) + 2)
            localStorage.setItem(JSON.parse(plantType).name + "-start", JSON.stringify(newDate.toLocaleDateString()));
            newDate.setDate(newDate.getDate() + Number(JSON.parse(plantType).season) + 2)
            localStorage.setItem(JSON.parse(plantType).name + "-end", JSON.stringify(newDate.toLocaleDateString()));
        } catch {
            /*let defaultDate = localStorage.getItem(plantType + "-start");
            console.log(defaultDate);
            setStartDate(JSON.parse(defaultDate)); 
            setEndDate(JSON.parse(defaultDate));*/
        }
    }


    let socket;
    if(socket){
        const buttonEl = document.querySelector('.water-button');
        buttonEl.style.display = 'none';
    }
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
            setDisplayError(`${msg}`);
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
      makeDates()
  return (
    <main className='container-fluid text-dark text-center'>
        <div>
            <div className="modal fade" id="wsMsgModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-dark">
                        <div className="modal-body" id="wsModal-body"> </div>
                        <div className="modal-footer">
                            <Button id="back-button" type="button" variant="success" data-bs-dismiss="modal">Close</Button>
                        </div>
                    </div>
                </div>
            </div>

            <h3>See your notifications here</h3>
            <WeatherUpdates />
            
            <div id= "plant-alerts" className="alert">
            <p>Plant information <span id= "plant-type">{JSON.parse(plantType).name}</span></p>
            <PlantDates 
                plant= {JSON.parse(plantType)}
                startDate= {startDate}
                endDate= {endDate}

            />

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
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}