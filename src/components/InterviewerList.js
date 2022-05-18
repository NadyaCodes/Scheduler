import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem.js"

export default function InterviewerList(props) {

  const {interviewers, setInterviewer, interviewer} = props;

  const allInterviewers = props.interviewers.map(x => (
    <InterviewerListItem
      id={x.id}
      name={x.name}
      avatar={x.avatar}
      setInterviewer={props.setInterviewer}
      selected={props.interviewer === x.id}
      />
    ))

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{allInterviewers}</ul>
    </section>
  )

}


// const allDays = props.days.map(x => (
//   <DayListItem
//     key={x.id}
//     name={x.name}
//     spots={x.spots}
//     selected={x.name === props.day}
//     setDay={props.setDay}
//     />
// ))