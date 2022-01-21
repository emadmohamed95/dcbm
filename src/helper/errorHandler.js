import { logout, logoutError } from '../actions/authActions'
import {store} from '../store/index'
export const handleError = (err)=>{


    if(err.response){
        console.log(err.response.status, err.response.data)

        if(err.response.status==400 && err.response.data.msg === "Token is not valid"){
            store.dispatch(logout())
        }

    }else{
        console.log(err)
    }

    

    // if(err.response.status===400 && err.response.data.msg === "Token is not valid" ){
    //     store.dispatch(logout())

    // }else{
    //     err.response.data?console.log(err.response.data.msg):console.log(err)
    // }

}