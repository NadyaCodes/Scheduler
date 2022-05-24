import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";
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
  )

}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}


// .add("Clickable", () => (
//   <InterviewerListItem
//     name={interviewer.name}
//     avatar={interviewer.avatar}
//     setInterviewer={() => action("setInterviewer")(interviewer.id)}
//   />
// ));


// const allDays = props.days.map(x => (
//   <DayListItem
//     key={x.id}
//     name={x.name}
//     spots={x.spots}
//     selected={x.name === props.day}
//     setDay={props.setDay}
//     />
// ))