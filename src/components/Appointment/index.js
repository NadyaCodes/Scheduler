import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"
// import { json } from "express/lib/response";
// import Create from "components/Appointment/Create.js"
// import { prototype } from "pg-pool";


export default function Appointment(props) {
  // const allInterviewers = [];

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"



  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING)
    
    return props.onBook(props.id, interview).then(() => (transition(SHOW))).catch((err) => console.log(err));

  }

  function maybeDeleteIt(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    }
    transition(CONFIRM)

  }

  function deleteIt(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    }
    transition(DELETING)

    return props.onDelete(props.id, interview).then(() => (transition(EMPTY))).catch((err) => console.log(err));


  }


  return(
    <article className="appointment">
      <Header time={props.time} />
      <>{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}</>
      <>{mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onEdit={() => transition(EDIT)} onDelete={maybeDeleteIt}/>}</>
      <>{mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back(EMPTY)}/>}</>
      <>{mode === SAVING && <Status message="Saving"/>}</>
      <>{mode === DELETING && <Status message="Deleting"/>}</>
      <>{mode === CONFIRM && <Confirm message="Are you sure you want to delete this?" onCancel={() => back(SHOW)} onConfirm={deleteIt}/>}</>
      <>{mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={() => back(SHOW)} />}</>

    </article>
  )
}
