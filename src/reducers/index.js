import { combineReducers } from 'redux'
import authReducer from './auth'
import userReducer from './user'
import countryReducer from './country'
import cinemaReducer from './cinema'
import screenReducer from './screen'
import movieReducer from './movie'
import loadingReducer from './loading'
import reportReducer from './report'
import notificationReducer from './notification'


export default combineReducers({
  auth:authReducer,
  user:userReducer, country:countryReducer,
  cinema:cinemaReducer, screen:screenReducer, movie:movieReducer,
   loading:loadingReducer, report:reportReducer, 
   notification: notificationReducer
})