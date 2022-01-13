import {GET_SCREENS,EDIT_SCREEN,DELETE_SCREEN,ADD_SCREEN} from '../actions/types';


const initialState = {
  screens: []
};

function screenReducer(state = initialState, action) {

  switch (action.type) {
    case GET_SCREENS:
      return {
        ...state,
        screens: action.payload
      };
      case ADD_SCREEN:
      return {
        ...state,
        screens: [...state.screens, action.payload]
      };

      case EDIT_SCREEN:
      return {
        ...state,
        screens: state.screens.map(screen => action.payload.id === screen.id? action.payload : screen)
      };

      case DELETE_SCREEN:
      return {
        ...state,
        screens: state.screens.filter(screen => screen.id != action.payload)
      };
    default:
      return state;
  }
}


export default screenReducer;
