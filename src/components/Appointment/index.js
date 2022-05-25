import React from "react";
import "components/Appointment/styles.scss";

// component imports
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";

//hook imports
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  //modes that show different versions of the appointment card
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  //hooks to change between views
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    return props.onBook(props.id, interview).then(() => (transition(SHOW))).catch(error => (transition(ERROR_SAVE, true)));
  };



  function deleteIt(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };
    
    transition(DELETING, true);

    return props.onDelete(props.id, interview).then(() => (transition(EMPTY))).catch(error => (transition(ERROR_DELETE, true)));
  };


  return(
    <article className="appointment">
      <Header time={props.time} />
      <>{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}</>
      <>{mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)}/>}</>
      <>{mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()}/>}</>
      <>{mode === SAVING && <Status message="Saving"/>}</>
      <>{mode === DELETING && <Status message="Deleting"/>}</>
      <>{mode === CONFIRM && <Confirm message="Are you sure you want to delete this?" onCancel={() => back()} onConfirm={deleteIt}/>}</>
      <>{mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={() => back(SHOW)} />}</>
      <>{mode === ERROR_SAVE && <Error message="Error Saving" onClose={() => back()} />}</>
      <>{mode === ERROR_DELETE && <Error message="Error Deleting" onClose={() => back()}/>}</>
    </article>
  );
};