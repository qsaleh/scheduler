import React from "react";

import DayListItem from "components/DayListItems"; 


export default function DayList(props) {

  const List = props.days.map(day =>    
  <DayListItem
    key = {day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />);

    return  <ul>{List}</ul>;    
}
