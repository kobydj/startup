import React from 'react';
import './info.css';

export function PlantDates(props){
    const [plantType, setPlantType] = React.useState(JSON.stringify(props.plant));
    const [startDate, setStartDate] = React.useState(JSON.parse(localStorage.getItem(props.plant.name + "-start")) || '');
    const [endDate, setEndDate] = React.useState(JSON.parse(localStorage.getItem(props.plant.name + "-end")) || '');





    async function setDates(date) {
        console.log(JSON.parse(plantType).season)
        const parsedDate = new Date(date);
        setStartDate(parsedDate.toLocaleDateString());
        parsedDate.setDate(parsedDate.getDate() + Number(JSON.parse(plantType).season) + 2)
        setEndDate(parsedDate.toLocaleDateString());

        const newDate = {name: JSON.parse(plantType).name, date: new Date(date).toLocaleDateString(), userName : localStorage.getItem('userName') };
        try{
          const response = await fetch('/api/date', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: (JSON.stringify(newDate)),
          });
          localStorage.setItem(JSON.parse(plantType).name + "-start", JSON.stringify(startDate));
          if(socket){
            broadcastEvent(localStorage.getItem('userName'), 'plantingTime', startDate.toLocaleDateString(), newDate.name)
          }
        }catch{
          localStorage.setItem(JSON.parse(plantType).name + "-start", JSON.stringify(startDate));
        }


    }


   return (
    <ul>
    <li id="germination-time">days to germination : <span id= "avg-germination"> {JSON.parse(plantType).germination} </span></li>
        <li>Planting date : <input id="start-date" className= "input-group date" type= "date"  min="2024-01-01" max="2024-12-31" defaultValue={startDate} onChange={(e)=> setDates(e.target.value)}></input></li>
        <li type="date">Harvest date : <span id="finish-date"> {endDate} </span></li>
    </ul>
   );
}
