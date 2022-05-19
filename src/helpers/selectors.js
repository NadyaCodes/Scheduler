export function getAppointmentsForDay(state, day) {

  const findDay = state.days.filter(date => date.name === day)

  if (!findDay[0]) {
    return findDay;
  }

  const appointmentIDs = findDay[0].appointments

  const appointmentArray = []

  for (let apt in appointmentIDs) {
    appointmentArray.push(state.appointments[appointmentIDs[apt]])
  }

  return appointmentArray;

}