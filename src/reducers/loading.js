import {IS_LOADING,FINISHED_LOADING, IS_LOADING_IN_DIALOG,FINISHED_LOADING_IN_DIALOG} from '../actions/types';


const initialState = {
    isLoading:false,
    isLoadingInDialog:false
  };


function loadingReducer(state = initialState, action) {

    switch (action.type) {
        case IS_LOADING:
          return {
            ...state,
            isLoading:true
          };
          case FINISHED_LOADING:
          return {
            ...state,
            isLoading:false
          };

          case IS_LOADING_IN_DIALOG:
          return {
            ...state,
            isLoadingInDialog:true
          };
          case FINISHED_LOADING_IN_DIALOG:
          return {
            ...state,
            isLoadingInDialog:false
          };
    
        default:
          return state;
      }
}

export default loadingReducer;
