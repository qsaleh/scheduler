import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const classNames = require('classnames');
  const InterviewerClass = classNames({
    "interviewers__item--selected": props.selected, 
  })
  return (
    <li className={InterviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}