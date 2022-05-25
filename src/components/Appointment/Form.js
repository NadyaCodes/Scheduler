import React, {useState} from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";



export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const spreadInterviewers = [...props.interviewers];

  
  //form functions
  const reset = () => {
    setInterviewer(null);
    setStudent("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
    setError("");
  };

  function validate() {
    if(student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if(interviewer === null) {
      setError("Please select an interviewer");
      return;
    };

    setError("");
    props.onSave(student, interviewer);
  };


  return(
    <main className="appointment__card appointment__card--create"  >
      {/* Student entry field */}
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        {/* Potential interviewers */}
        <InterviewerList
          interviewers={spreadInterviewers}
          value={interviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        {/* buttons */}
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()} value={student}>Save</Button>
        </section>
      </section>
    </main>
  );
}