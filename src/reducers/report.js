import {GET_DISTRIBUTORS_ACTIONS} from '../actions/types';


const initialState = {
  distributorsActions: []
};

function reportReducer(state = initialState, action) {

  switch (action.type) {
    case GET_DISTRIBUTORS_ACTIONS:
      return {
        ...state,
        distributorsActions: action.payload
      };
      
    default:
      return state;
  }
}


export default reportReducer;
