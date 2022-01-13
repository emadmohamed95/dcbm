import {GET_CINEMAS,EDIT_CINEMA,DELETE_CINEMA,ADD_CINEMA} from '../actions/types';


const initialState = {
  cinemas: []
};

function cinemaReducer(state = initialState, action) {

  switch (action.type) {
    case GET_CINEMAS:
      return {
        ...state,
        cinemas: action.payload
      };
      case ADD_CINEMA:
      return {
        ...state,
        cinemas: [...state.cinemas, action.payload]
      };

      case EDIT_CINEMA:
      return {
        ...state,
        cinemas: state.cinemas.map(cinema => action.payload.id === cinema.id? action.payload : cinema)
      };

      case DELETE_CINEMA:
      return {
        ...state,
        cinemas: state.cinemas.filter(cinema => cinema.id != action.payload)
      };
    default:
      return state;
  }
}


export default cinemaReducer;
