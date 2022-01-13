import {GET_COUNTRIES,EDIT_COUNTRY,DELETE_COUNTRY,ADD_COUNTRY} from '../actions/types';


const initialState = {
  countries: []
};

function countryReducer(state = initialState, action) {

  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      };
      case ADD_COUNTRY:
      return {
        ...state,
        countries: [...state.countries, action.payload]
      };

      case EDIT_COUNTRY:
      return {
        ...state,
        countries: state.countries.map(country => action.payload.id === country.id? action.payload : country)
      };

      case DELETE_COUNTRY:
      return {
        ...state,
        countries: state.countries.filter(country => country.id != action.payload)
      };
    default:
      return state;
  }
}


export default countryReducer;
