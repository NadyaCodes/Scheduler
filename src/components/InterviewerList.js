import React from "react";
import "components/InterviewerList.scss";

//component imports
import InterviewerListItem from "components/InterviewerListItem.js";

//proptypes
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const {interviewers, value, onChange} = props;

  const allInterviewers = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{allInterviewers}</ul>
    </section>
  );

}

//makes sure interviewer list is an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}