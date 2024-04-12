import React from 'react';
import './info.css';

export function PlantDates(props){
    const [plantType, setPlantType] = React.useState(JSON.stringify(props.plant));
    const [startDate, setStartDate] = React.useState(new Date().toLocaleDateString());
    const [endDate, setEndDate] = React.useState('');


    async function setDates(date) {
        console.log(JSON.parse(plantType).season)
        const parsedDate = new Date(date);
        setStartDate(parsedDate.toLocaleDateString());
        parsedDate.setDate(parsedDate.getDate() + Number(JSON.parse(plantType).season) + 2)
        setEndDate(parsedDate.toLocaleDateString());

    }


   return (
    <ul>
    <li id="germination-time">days to germination : <span id= "avg-germination"> {JSON.parse(plantType).germination} </span></li>
        <li>Planting date : <input id="start-date" className= "input-group date" type= "date"  min="2024-01-01" max="2024-12-31" /*value="2024-01-01"*/ onChange={(e)=> setDates(e.target.value)}></input></li>
        <li type="date">Harvest date : <span id="finish-date"> {endDate} </span></li>
    </ul>
   );
}
