function getAppointmentsForDay(state, day) {

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

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer

  const allInterviewers = state.interviewers

  const selectedInterviewerObj = allInterviewers[interviewerID]

  const allInterviewInfo = {...interview }

  allInterviewInfo.interviewer = selectedInterviewerObj

  return allInterviewInfo

}

module.exports = {getAppointmentsForDay, getInterview }
