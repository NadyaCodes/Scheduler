function getAppointmentsForDay(state, day) {

  //find today
  const findDay = state.days.filter(date => date.name === day);

  if (!findDay[0]) {
    return findDay;
  };

  //find appointment IDs for today
  const appointmentIDs = findDay[0].appointments;

  const appointmentArray = [];

  //create and return array of appointment IDs
  for (let apt in appointmentIDs) {
    appointmentArray.push(state.appointments[appointmentIDs[apt]]);
  };

  return appointmentArray;

};

//get all the needed info about an interview
function getInterview(state, interview) {
  if (!interview) {
    return null;
  };

  const interviewerID = interview.interviewer;
  const allInterviewers = state.interviewers;

  const selectedInterviewerObj = allInterviewers[interviewerID];

  const allInterviewInfo = {...interview };

  allInterviewInfo.interviewer = selectedInterviewerObj;

  return allInterviewInfo;

};

function getInterviewersForDay(state, day) {

  if (!state.days) {
    return [];
  };

  //find today
  const findDay = state.days.filter(date => date.name === day);

  if (!findDay[0]) {
    return findDay;
  };

  const interviewerIDs = findDay[0].interviewers;

  if (!interviewerIDs) {
    return [];
  };

  const interviewerArray = [];

  //make interviewerID array
  for (let int in interviewerIDs) {
    interviewerArray.push(state.interviewers[interviewerIDs[int]]);
  };

  return interviewerArray;

}

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay };
