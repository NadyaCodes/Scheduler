
   
// import React, { Fragment } from "react";
// import "components/Appointment/styles.scss"
// import Header from "components/Appointment/Header.js"
// import Show from "components/Appointment/Show.js"
// import Empty from "components/Appointment/Empty.js"


// export default function Appointment(props) {
//   return(
//     <article className="appointment">
//       <Header time={props.time} />
//       <>{props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}</>

//     </article>
//   )
// }


import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js"
// import Create from "components/Appointment/Create.js"
// import { prototype } from "pg-pool";


export default function Appointment(props) {
  const allInterviewers = [];

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  // {mode === SHOW && (
  //   <Show
  //     student={props.interview.student}
  //     interviewer={props.interview.interviewer}
  //   />
  // )}

  // {mode === CREATE && <Form 
  //   student={"Frank"} 
  //   interviewers={[]}
  //   interviewer={"interviewer"}
  //   onSave={"onSave"}
  //   onCancel={"onCancel"} />}



  return(
    <article className="appointment">
      <Header time={props.time} />
      <>{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}</>
      <>{mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onEdit={() => console.log("edit")} onDelete={() => console.log("delete")}/>}</>
      <>{mode === CREATE && <Form interviewers={allInterviewers} onSave={() => console.log("You clicked Save")} onCancel={() => back(EMPTY)}/>}</>
      
      {/* <>{props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}</> */}

    </article>
  )
}


// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial)
//   const [history, setHistory] = useState([initial])
  

//   function transition(input, replace = false) { 
//     !replace ? history.push(input) && setMode(input) : history.pop() && history.push(input) && setMode(history[history.length - 1])
//   }

//   function back() {
//     if (history.length > 1) {
//       history.pop(history[history.length - 1]); 
//       setMode(history[history.length - 1])
//     } else {
//       setMode(history[0])
//     }
//   }


//   return { mode, transition, back };
// }