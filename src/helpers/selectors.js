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

function getInterviewersForDay(state, day) {

  if (!state.days) {
    return [];
  }

  const findDay = state.days.filter(date => date.name === day)

  if (!findDay[0]) {
    return findDay;
  }

  const interviewerIDs = findDay[0].interviewers

  if (!interviewerIDs) {
    return []
  }

  const interviewerArray = []

  for (let int in interviewerIDs) {
    interviewerArray.push(state.interviewers[interviewerIDs[int]])
  }

  return interviewerArray;

}

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay }
