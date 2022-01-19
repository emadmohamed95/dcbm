import axios from "axios";
import {
  GET_MOVIES,
  EDIT_MOVIE,
  DELETE_MOVIE,
  ADD_MOVIE,
  REQUEST_MOVIE,
  DISTRIBUTE_MOVIE,
  IS_LOADING,
  FINISHED_LOADING,
  SEND_KDMS,
  ADD_MOVIE_VERSION,
  EDIT_MOVIE_VERSION,
  DELETE_MOVIE_VERSION,
  DISTRIBUTE_MOVIE_VERSION,
  ASSIGN_MOVIE_CINEMAS,
  DEASSIGN_MOVIE_CINEMAS,
  GET_MOVIE_USERS
} from "./types";
import { tokenConfig,nonStatetokenConfig } from "./authActions";
// import { sendNotification } from "../helper/notifier";
import { URL } from "../constants/constants";

// import { IItem } from '../../types/interfaces';

export const getMovies = () => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .get(URL+"/api/movies", tokenConfig(getState))
    .then((res) => {
      // console.log(res)

      dispatch({
        type: GET_MOVIES,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });

      // sendNotification('Users fetched Successfully','success');
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const addMovie = (movie,navigation) => (dispatch, getState) => {
  // console.log(movie)
  dispatch({
    type: IS_LOADING,
    payload: true,
  });

  const files = movie.dkdm;
  delete movie.dkdm;

  const formData = new FormData();
  Object.keys(movie).forEach((key) => formData.append(key, movie[key]));

  if (files) {
    for (var x = 0; x < files.length; x++) {
      let file = files[x]
      file.uri = Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
      formData.append("dkdm", file);
    }
  }

  // const formData = new FormData();
  //   Object.keys(movie).forEach(key => formData.append(key, movie[key]));

  axios
    .post(URL+"/api/movies", formData, tokenConfig(getState))
    .then((res) => {
      // console.log(res)

      dispatch({
        type: ADD_MOVIE,
        payload: res.data,
      });

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Movie Added Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    ).finally(()=>{
      if(navigation){
        navigation.goBack()
      }
    })
};

export const editMovie = (movie,navigation) => (dispatch, getState) => {
  dispatch({
    type: IS_LOADING,
    payload: true,
  });

  const id = movie.id;
  delete movie.id;

  const files = movie.dkdm;
  delete movie.dkdm;

  const formData = new FormData();
  Object.keys(movie).forEach((key) => formData.append(key, movie[key]));

  // if (files) {
  //   for (var x = 0; x < files.length; x++) {
  //     formData.append("dkdm", files[x]);
  //   }
  // }

  if (files) {
    for (var x = 0; x < files.length; x++) {
      let file = files[x]
      file.uri = Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
      formData.append("dkdm", file);
    }
  }

  axios
    .put(URL+"/api/movies/" + id, formData, tokenConfig(getState))
    .then((res) => {
      // console.log(res)

      dispatch({
        type: EDIT_MOVIE,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Movie Edited Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    ).finally(()=>{
      if(navigation){
        navigation.goBack()
      }
    })
};

export const deleteMovie = (movie) => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .delete(URL+"/api/movies/" + movie.id, tokenConfig(getState))
    .then((res) => {
      // console.log(res)

      dispatch({
        type: DELETE_MOVIE,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Movie Deleted Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const requestMovie = (movie, user) => (dispatch, getState) => {
  const id = movie.id;
  dispatch({
    type: IS_LOADING,
    payload: true,
  });

  axios
    .post(URL+`/api/movies/${id}/request-movie`, { user }, tokenConfig(getState))
    .then((res) => {
      // console.log(res)

      dispatch({
        type: REQUEST_MOVIE,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification('Movie Edited Successfully','success');
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const assignMovie = (movie, values) => (dispatch, getState) => {
  const id = movie.id;
  // console.log(movie);
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(URL+`/api/movies/${id}/assign-movie`, values, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ASSIGN_MOVIE_CINEMAS,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Movie Assigned to Cinemas Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const deassignMovie = (movie, cinemaMovies) => (dispatch, getState) => {
  const id = movie.id;
  // console.log(movie);
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(
      URL+`/api/movies/${id}/deassign-movie`,
      { cinemaMovies },
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res)

      dispatch({
        type: DEASSIGN_MOVIE_CINEMAS,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification(
      //   "Movie Versions Deassigned to Cinemas Successfully",
      //   "success"
      // );
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const distributeMovie = (movie, user, cinemaMovies, sendKdmToCinema) => (
  dispatch,
  getState
) => {
  const id = movie.id;
  // console.log(movie);
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(
      URL+`/api/movies/${id}/distribute-movie`,
      { movie, user, cinemaMovies, sendKdmToCinema },
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res)

      dispatch({
        type: DISTRIBUTE_MOVIE,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification('Movie KDMs Distributed Successfully','success');
      // sendNotification('Movie KDMs are being Sent','info');
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const sendKdms = (cinemaMovies, movie, user, sendKdmToCinema) => (
  dispatch,
  getState
) => {
  const id = movie.id;
  // console.log(movie);
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(
      URL+`/api/movies/${id}/send-kdms`,
      { cinemaMovies, movie, user, sendKdmToCinema },
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res)

      dispatch({
        type: SEND_KDMS,
        payload: res.data,
      });

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Movie KDMs are being Sent", "info");
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const getMovieVersions = (movie) => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .get(URL+`/api/movies/${movie.id}/versions`, tokenConfig(getState))
    .then((res) => {
      // console.log(res)

      dispatch({
        type: GET_MOVIES,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification('Users fetched Successfully','success');
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const addMovieVersion = (movieVersion) => (dispatch, getState) => {
  // console.log(movie)

  const id = movieVersion.movieId;
  delete movieVersion.movieId;

  const formData = new FormData();
  Object.keys(movieVersion).forEach((key) =>
    formData.append(key, movieVersion[key])
  );

  dispatch({
    type: IS_LOADING,
    payload: true,
  });

  axios
    .post(URL+`/api/movies/${id}/versions`, formData, tokenConfig(getState))
    .then((res) => {
      // console.log(res)

      dispatch({
        type: ADD_MOVIE_VERSION,
        payload: res.data,
      });

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });

      // sendNotification("Movie Version Added Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const editMovieVersion = (movieVersion) => (dispatch, getState) => {
  dispatch({
    type: IS_LOADING,
    payload: true,
  });

  const id = movieVersion.movieId;
  delete movieVersion.movieId;
  const movieVersionId = movieVersion.id;
  delete movieVersion.id;

  // console.log(movieVersion);

  const formData = new FormData();
  Object.keys(movieVersion).forEach((key) =>
    formData.append(key, movieVersion[key])
  );

  axios
    .put(
      URL+`/api/movies/${id}/versions/${movieVersionId}`,
      formData,
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res)

      dispatch({
        type: EDIT_MOVIE_VERSION,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Movie Version Edited Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const deleteMovieVersion = (movie, movieVersion) => (
  dispatch,
  getState
) => {
  // console.log("inside actions")

  const id = movie.id;
  const movieVersionId = movieVersion.id;
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .delete(
      URL+`/api/movies/${id}/versions/${movieVersionId}`,
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res)

      dispatch({
        type: DELETE_MOVIE_VERSION,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Movie Version Deleted Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};

export const distributeMovieVersion = (movieVersion, cinema, user) => (
  dispatch,
  getState
) => {
  const id = movieVersion.movie.id;
  const movieVersionId = movieVersion.id;
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(
      URL+`/api/movies/${id}/versions/${movieVersionId}/distribute-movieVersion`,
      { cinema, user },
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res)

      dispatch({
        type: DISTRIBUTE_MOVIE_VERSION,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Movie Versions KDMs Generated Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    );
};


export const getMovieUsers = (id,token) => {

  return axios.get(URL+`/api/movies/${id}/users`, nonStatetokenConfig(token))

  // console.log(res)

  // if(res.status=="200"){
  //   return res.data
  // }else{
  //   sendNotification('Movie Users fetching failed','error')
  //   return []

  // }
  

};


export const getMoviesAssignedToUser = (id,token) => {

  return axios.get(URL+`/api/movies/users/${id}`, nonStatetokenConfig(token))

  // console.log(res)

  // if(res.status=="200"){
  //   return res.data
  // }else{
  //   sendNotification('Movie Users fetching failed','error')
  //   return []

  // }
  

};


export const getPreviouslyDistributedMovies = (id,token) => {

  return axios.get(URL+`/api/movies/users/${id}/history`, nonStatetokenConfig(token))

};


export const getMovieVersionsAssignedToUser = (id,uid,token) => {

  return axios.get(URL+`/api/movies/${id}/users/${uid}`, nonStatetokenConfig(token))

  // console.log(res)

  // if(res.status=="200"){
  //   return res.data
  // }else{
  //   sendNotification('Movie Users fetching failed','error')
  //   return []

  // }
  

};


export const redistributeMovie = (movie, user, cinemaMovies, startDate, endDate) => (
  dispatch,
  getState
) => {
  const id = movie.id;
  // console.log(movie);
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(
      URL+`/api/movies/${id}/redistribute-movie`,
      { movie, user, cinemaMovies,startDate, endDate },
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res)

      dispatch({
        type: DISTRIBUTE_MOVIE,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification('Movie KDMs Distributed Successfully','success');
      // sendNotification('Movie KDMs are being Sent','info');
    })
    .catch((err) =>
console.log(err.response.data)    );
};