import {GET_MOVIES,EDIT_MOVIE,DELETE_MOVIE,ADD_MOVIE,DISTRIBUTE_MOVIE,SEND_KDMS,ADD_MOVIE_VERSION,EDIT_MOVIE_VERSION,DELETE_MOVIE_VERSION,DISTRIBUTE_MOVIE_VERSION,ASSIGN_MOVIE_CINEMAS
,DEASSIGN_MOVIE_CINEMAS,REDISTRIBUTE_MOVIE} from '../actions/types';


const initialState = {
  movies: []
};
 
function movieReducer(state = initialState, action) {

  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
      case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload]
      };

      case EDIT_MOVIE:
      case EDIT_MOVIE_VERSION:
      case DELETE_MOVIE_VERSION:
      case ADD_MOVIE_VERSION:
      case ASSIGN_MOVIE_CINEMAS:
      case DEASSIGN_MOVIE_CINEMAS:
      return {
        ...state,
        movies: state.movies.map(movie => action.payload.id === movie.id? action.payload : movie)
      };

      case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id != action.payload)
      };

      case DISTRIBUTE_MOVIE:
      case REDISTRIBUTE_MOVIE:
      case DISTRIBUTE_MOVIE_VERSION:
      return {
        ...state,
        movies: state.movies.map(movie => action.payload.id === movie.id? action.payload : movie)

      };

      case SEND_KDMS:
        return {
          ...state,
          movies: state.movies.map(movie => action.payload.id === movie.id? action.payload : movie)
  
        };


    default:
      return state;
  }
}


export default movieReducer;
