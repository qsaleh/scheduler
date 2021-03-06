import React from "react";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";


import InterviewerListItem from "components/InterviewerListItem";
  InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
export default function InterviewerList(props) {
  
  const interviewer = props.interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={event => props.onChange(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewer}</ul>
    </section>
  );
}
