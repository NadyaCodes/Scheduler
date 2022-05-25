import React from "react";
import "components/Application.scss";

//component imports
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";

//helpers imports
import {getAppointmentsForDay, getInterview} from "helpers/selectors.js";
import { getInterviewersForDay } from "helpers/selectors.js";

//hooks imports
import useApplicationData from "hooks/useApplicationData.js";



export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData()


  const todaysInterviewers = getInterviewersForDay(state, state.day);
  const todaysAppointments = getAppointmentsForDay(state, state.day);


  //create appointment section with todays appointments
  const appointments = todaysAppointments.map((appointment) => {
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
      {/* days sidebar menu */}
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
      {/* appointment slots for day */}
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
