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

  if (!day) {
    return null;
  }

  if (!state.days) {
    return [];
  }

  const todaysAppointments = getAppointmentsForDay(state, day)

  if (!todaysAppointments) {
    return null;
  }

  const findInterviews = todaysAppointments.filter(interviews => interviews.interview != null)

  const interviewersArray = []

  for (let int in findInterviews) {
    const interviewerID = [findInterviews[int].interview.interviewer]
    const interviewerObject = state.interviewers[interviewerID]

    let doubles = false;
    for (let i in interviewersArray) {
      if (interviewerObject.id === interviewersArray[i].id) {
        doubles = true;
      }
    }

    if (!doubles) {
      interviewersArray.push(interviewerObject)
    }

  }

  return interviewersArray;

}

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay }
