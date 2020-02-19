export function getAppointmentsForDay(state, day) {
  const singleDay = state.days.filter((x) => { 
    return x.name === day;
    });

    if (singleDay.length === 0) {
      return [];
    }
    const mappedAppointments = singleDay.appointments.map((element) => {
      return state.appointments[element]
    });
  
    return mappedAppointments;
}