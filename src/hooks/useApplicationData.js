import {useEffect, useState} from "react";
import axios from 'axios';

export default function useApplicationData() {

  //create state to be exported
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });



  //setDay function to be exported
  const setDay = day => setState({ ...state, day});



  //set state with days, appointments and interview info from API
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });

  }, []);



  //count the number of spots left in the given day
  const countSpots = (state) => {
    const currentDay = state.days.find((day) => day.name === state.day);
    const appointmentIds = currentDay.appointments;
  
    const spots = appointmentIds.filter((id) => !state.appointments[id].interview).length;
  
    return spots;
  };



  //update the spots left in the given day
  const updateSpots = (state) => {
    const updatedState = { ...state };
    const updatedDays = [...state.days];
    const updatedDay = { ...state.days.find((day) => day.name === state.day) };
  
    const spots = countSpots(state);

    //set new spots in spreaded day
    updatedDay.spots = spots;

    const updatedDayIndex = state.days.findIndex((day) => day.name === state.day);

    //update the day's info
    updatedDays[updatedDayIndex] = updatedDay;
  
    //update the state with the new days info
    updatedState.days = updatedDays;
  
    return updatedState;
  };



  //save new interview function to be exported
  function bookInterview(id, interview) {

    //new appointment to be added
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    //new version of appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const URL = `/api/appointments/${appointment.id}`;

    return axios({
      method: "PUT",
      url: URL,
      data:
        {...appointment}
    }).then(res => {
      const newState = updateSpots({...state, appointments});

      setState({
        ...newState
      });

      return;
    })
    .catch(error => {
      return Promise.reject(error)
    });

  };



  //cancel interview function to be exported
  function cancelInterview(id, interview) {

    //new appointment info (cancellation)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    //updated version of appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const URL = `/api/appointments/${appointment.id}`;

    return axios({
      method: "DELETE",
      url: URL,
      data:
        {...appointment}
    }).then(res => {
      const newState = updateSpots({...state, appointments});

      setState({
        ...newState
      });

      return;

    }).catch(error => {
      return Promise.reject(error);
    });

  };


  return { state, setDay, bookInterview, cancelInterview };
};