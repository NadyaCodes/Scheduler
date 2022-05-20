import React, {useEffect, useState} from "react";

import "components/Application.scss";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index.js"
import axios from 'axios';
import getAppointmentsForDay from "helpers/selectors.js";


export default function Application(props) {

  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  let dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));




  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ]).then((all) => {
      // console.log(all[0].data)
      // console.log(all[1].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
    });

  }, [])


  const allAppointments = dailyAppointments.map((appointment) => 
  <Appointment key={appointment.id} {...appointment} />
  );


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
        {allAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
