import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
// import Create from "components/Appointment/Create.js"
// import { prototype } from "pg-pool";


export default function Appointment(props) {
  // const allInterviewers = [];

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    console.log(name)
    console.log(interviewer)
 
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING)
    console.log(interview)
    
    return props.onBook(props.id, interview).then(() => (transition(SHOW)));

  }


  return(
    <article className="appointment">
      <Header time={props.time} />
      <>{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}</>
      <>{mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onEdit={() => console.log("edit")} onDelete={() => console.log("delete")}/>}</>
      <>{mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back(EMPTY)}/>}</>
      <>{mode === SAVING && <Status message="Saving"/>}</>

    </article>
  )
}
