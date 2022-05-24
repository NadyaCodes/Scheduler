import {useEffect, useState} from "react"
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";
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
    interviewers: [],
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
      // console.log("days?", all[0].data[day])
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      console.log(state)
    });

  }, [])



//in gary's, need to declare updated state 
//return updated days array, instead of state
  const countSpots = (state) => {
    const currentDay = state.days.find((day) => day.name === state.day);
    const appointmentIds = currentDay.appointments;
  
    const spots = appointmentIds.filter((id) => !state.appointments[id].interview).length;
  
    return spots;
  };
  
  const updateSpots = (state) => {
    const updatedState = { ...state };
    const updatedDays = [...state.days];
    const updatedDay = { ...state.days.find((day) => day.name === state.day) };
  
    const spots = countSpots(state);
    updatedDay.spots = spots;
  
    const updatedDayIndex = state.days.findIndex((day) => day.name === state.day);
    updatedDays[updatedDayIndex] = updatedDay;
  
    updatedState.days = updatedDays;
  
    return updatedState;
  };
  

  function bookInterview(id, interview) {
    console.log("spots before booking", state)

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // console.log(interview)

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
      // console.log(res)
      // if (interview.interviewer) {
      //   return setState({
      //     ...state,
      //     appointments
      //   })
      // } else {
      //   return Promise.reject("error")
      // }


      const newState = updateSpots({...state, appointments})

      setState({
        ...newState
      })
      return;

    })
    .catch(error => {
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
      const newState = updateSpots({...state, appointments})

      setState({
        ...newState
      })
      return;
    }).catch(error => {
      return Promise.reject(error)
    })

  }








  return { state, setDay, bookInterview, cancelInterview }
}


