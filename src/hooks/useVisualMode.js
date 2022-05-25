
import {useState} from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history] = useState([initial])
  
  //transition forward. If replace is true, history gets altered
  function transition(input, replace = false) { 
    !replace ? history.push(input) && setMode(input) : history.pop() && history.push(input) && setMode(history[history.length - 1])
  }

  //transition backwards in history
  function back() {
    if (history.length > 1) {
      history.pop(history[history.length - 1]); 
      setMode(history[history.length - 1])
    } else {
      setMode(history[0])
    }
  }


  return { mode, transition, back };
}
