
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
  }
  const newInterview = {
    ...interview,
    interviewer: {...state.interviewers[interview.interviewer] }
  }
  
  return newInterview;
}