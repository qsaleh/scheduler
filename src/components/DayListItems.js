import React from "react";
import "components/DayListItem.scss";

const formatSpots = function(spots) {
  if ( spots === 0 ){
    return 'no spots remaining';
  } else if ( spots === 1 ){
    return "1 spot remaining";
  }
  return `${spots} spots remaining`; 
}

export default function DayListItem(props) {
const classNames = require('classnames');
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
    
  })
  return (
    <li className={dayClass} onClick ={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

