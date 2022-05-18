import React, {useState} from "react";
import Button from "components/Button.js"
import InterviewerList from "components/InterviewerList.js"



export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // console.log(interviewer)

  const spreadInterviewers = [...props.interviewers]

  const reset = () => {
    setInterviewer(null)
    setStudent("") 
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }


  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
      <InterviewerList 
        interviewers={spreadInterviewers}
        value={interviewer}
        onChange={(event) => setInterviewer(event)}
      />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)} value={student}>Save</Button>
        </section>
      </section>
    </main>
  )
}


// setInterviewer={() => onChange(interviewer.id)}