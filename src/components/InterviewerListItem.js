import React, {useState, Fragment} from 'react';
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {

  // const {id, name, avatar, selected} = props;

  const [interviewer, setInterviewer] = useState("")

  const interviewerClass = classNames("interviewers__item", {
    " interviewers__item--selected": props.selected
  })

  return(
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && <>{props.name}</>}
    </li>
  )
}


// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };