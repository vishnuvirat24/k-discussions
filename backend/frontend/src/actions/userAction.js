import axios from 'axios'
import { USER_REGISTER_REQUEST , USER_REGISTER_SUCCESS ,USER_REGISTER_FAIL , USER_LOGIN_REQUEST, USER_LOGIN_FAIL , USER_LOGIN_SUCCESS  ,USER_LOGOUT} from '../constants/userConstants'




export const register = (username , password)=> async(dispatch)=>
{
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        await axios.post("/api/register", {'username':username , 'password':password})

        dispatch(
            {
                type:USER_REGISTER_SUCCESS
            }
        )
    }
    catch(error)
    {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.detail
               ? error.response.data.detail : error.message
        })
    }
}

export const login = (username , password)=> async(dispatch)=>
{
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const {data}=await axios.post("/api/login", {'username':username , 'password':password})

        dispatch(
            {
                type:USER_LOGIN_SUCCESS,
                payload:data
            }
        )

        
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error)
    {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.detail
               ? error.response.data.detail : error.message
        })
    }
}

export const logout=()=>(dispatch)=>
{
    localStorage.removeItem('userInfo')
    dispatch(
        {
            type:USER_LOGOUT
        } 
    )
}