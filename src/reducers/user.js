import {GET_USERS, ADD_USER, DELETE_USER,EDIT_USER} from '../actions/types';


const initialState = {
  users: []
};

function userReducer(state = initialState, action) {

  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
      case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };

      case EDIT_USER:
      return {
        ...state,
        users: state.users.map(user => action.payload.id === user.id? action.payload : user)
      };

      case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id != action.payload)
      };
    default:
      return state;
  }
}


export default userReducer;
