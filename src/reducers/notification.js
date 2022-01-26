import {SHOW_NOTIFICATION,HIDE_NOTIFICATION} from '../actions/types';


const initialState = {
    type:null,
    message:null,

  };


function notificationsReducer(state = initialState, action) {
// console.log(action)
    switch (action.type) {
        case SHOW_NOTIFICATION:
          return {
            ...state,
            type:action.payload.type,
            message: action.payload.message
          };
          case HIDE_NOTIFICATION:
          return {
            ...state,
            type:null,
            message: null
                  };
    
        default:
          return state;
      }
}

export default notificationsReducer;
