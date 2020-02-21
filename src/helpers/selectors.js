
export function getAppointmentsForDay(state, day) {
  const filteredAppointments = []
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(appointmentId => {
        filteredAppointments.push(state.appointments[appointmentId])
      })
    }
  })
  return filteredAppointments
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
  const newInterview = {
    ...interview,
    interviewer: {...state.interviewers[interview.interviewer] }
  }

  return newInterview;
}
}

export function getInterviewersForDay(state, day) {
  let filteredDays = [];
  const daysAppts = state.days.filter(x => x.name === day);
  if (daysAppts.length === 0){
    return filteredDays;
  } else {
  filteredDays = daysAppts[0].interviewers.map(y => (state.interviewers[y]));
  return filteredDays;
  }
}