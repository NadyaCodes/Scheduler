import React, {useEffect, useState} from "react";

import "components/Application.scss";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index.js"
import axios from 'axios';
import {getAppointmentsForDay, getInterview} from "helpers/selectors.js";
import { getInterviewersForDay } from "helpers/selectors.js";


export default function Application(props) {

  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  })
  const appointments = getAppointmentsForDay(state, state.day);


  const setDay = day => setState({ ...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    const URL = `/api/appointments/${appointment.id}`

    return axios({
      method: "PUT",
      url: URL,
      data: 
        {...appointment}
    }).catch(error => {
      console.log(error)
    }).then(res => {
      // console.log(res)
      setState( {
        ...state,
        appointments
      })
    }

    );


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

    console.log("appointment", appointment)

    
    const URL = `/api/appointments/${appointment.id}`


    return axios({
      method: "DELETE",
      url: URL,
      data: 
        {...appointment}
    }).catch(error => {
      console.log(error)
    }).then(res => {
      console.log("res",res )
      setState( {
        ...state,
        appointments
      })
    }

    );

    // return axios
    //   .delete(URL, {data: {...appointment}})
    //     .then((res) => {
    //       console.log('res', res)
    //       setState({
    //         ...state,
    //         appointments
    //       })
    //     })

  }


  const todaysInterviewers = getInterviewersForDay(state, state.day)


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

  



  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={todaysInterviewers}
        onBook={bookInterview}
        onDelete={cancelInterview}
      />
    );
  });


  return (
    <main className="layout">

      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>

      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
