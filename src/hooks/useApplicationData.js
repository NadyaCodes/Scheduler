import {useEffect, useState} from "react"
import axios from 'axios';
// import "components/Application.scss";
// import DayList from "components/DayList.js"
// import Appointment from "components/Appointment/index.js"

// import {getAppointmentsForDay, getInterview} from "helpers/selectors.js";
// import { getInterviewersForDay } from "helpers/selectors.js";
// import useApplicationData from "hooks/useApplicationData.js"

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  })

  const setDay = day => setState({ ...state, day});

  // setDay("Tuesday")
  // console.log(state)

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      // console.log(all[0].data)
      // console.log(all[1].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });

  }, [])



  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log(interview)

    // if (!interview.interviewer) {
    //   throw new Error;
    // }


    const URL = `/api/appointments/${appointment.id}`

    return axios({
      method: "PUT",
      url: URL,
      data: 
        {...appointment}
    }).then(res => {
      console.log(res)
      if (interview.interviewer) {
        setState({
          ...state,
          appointments
        })
      } else {
        return Promise.reject("error")
      }



    }).catch(error => {
      return Promise.reject(error)
    });


  }


  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // console.log("appointment", appointment)

    
    const URL = `/api/appointments/${appointment.id}`


    return axios({
      method: "DELETE",
      url: URL,
      data: 
        {...appointment}
    }).then(res => {
      console.log("res",res )
      setState( {
        ...state,
        appointments
      })
    }).catch(error => {
      return Promise.reject(error)
    })

  }




  return { state, setDay, bookInterview, cancelInterview }
}


