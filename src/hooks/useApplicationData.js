import { useReducer, useEffect } from "react";
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const UPDATE_SPOTS = "UPDATE_SPOTS";

export default function useApplicationData() {
 

  const reducer = (state, action) => {

    function updateSpots(){
      let spots = 0;
      for (let day in state.days) {
        if ((state.days[day].name === state.day)) {
          for (let id of state.days[day].appointments) {
            if (state.appointments[id].interview === null) {
              spots++;
            }
          }
        }
      }
      return state.days.map((day) => { return day.name !== state.day ? day : { ...day, spots }})
    }


    switch (action.type)  {
      case SET_DAY:
        return { ...state, day: action.value};
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
      case SET_INTERVIEW:
        return { ...state, appointments: action.value}
      case UPDATE_SPOTS:
        return { ...state, days: updateSpots()}
      default:
        throw new Error (`Could not reduce: ${action.type}`)
    }

  }

  const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}});
  const setDay = day => dispatch({ type: SET_DAY, value: day});

    useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments"), axios.get("/api/interviewers")])
    .then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data});
    });
  }, []);

  
  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Promise.resolve(axios.put(`/api/appointments/${id}`, appointment))
      .then (() => dispatch({
      type: SET_INTERVIEW, value: appointments
      }))
      .then (() => dispatch({
        type: UPDATE_SPOTS
        }))
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

     const appointments = {
       ...state.appointments,
       [id]: appointment
     };
     return Promise.resolve(axios.delete(`/api/appointments/${id}`))
     .then (() => dispatch({ 
      type: SET_INTERVIEW, value: appointments
    }))
    .then (() => dispatch({
      type: UPDATE_SPOTS
      }))
    }

    return ({
      state: state,
      setDay: setDay,
      bookInterview: bookInterview,
      cancelInterview: cancelInterview
    });
};
