import axios from 'axios'
import { DISCUSSION_LIST_REQUEST , DISCUSSION_LIST_SUCCESS , DISCUSSION_LIST_FAIL , DISCUSSION_CREATE_REQUEST , DISCUSSION_CREATE_SUCCESS , DISCUSSION_CREATE_FAIL , D_LIST_FAIL , D_LIST_REQUEST , D_LIST_SUCCESS , D_REPLY_FAIL , D_REPLY_SUCCESS , D_REPLY_REQUEST } from '../constants/discussionConstants'


export const listDiscussions =()=> async(dispatch)=>
{
    try{
        dispatch({
            type:DISCUSSION_LIST_REQUEST
        })
        const {data} = await axios.get("/api/discussions")
        dispatch({
            type:DISCUSSION_LIST_SUCCESS,
            payload:data
        })
    }
    catch(error)
    {
        dispatch({
            type:DISCUSSION_LIST_FAIL,
            payload:error.response && error.response.data.detail
               ? error.response.data.detail : error.message
        })
    }
}

export const createDiscussion =(name , title, description)=>async(dispatch)=>{
    try{
        dispatch({
            type:DISCUSSION_CREATE_REQUEST
        })

        await axios.post("/api/discussions" , {'name':name , 'title':title,'description':description})
        dispatch({
            type:DISCUSSION_CREATE_SUCCESS,
        })
    }
    catch(error)
    {
        dispatch({
            type:DISCUSSION_CREATE_FAIL,
            payload:error.response && error.response.data.detail
               ? error.response.data.detail : error.message
        })
    }
}

export const listD = (id)=>async(dispatch)=>
{
    try{
        dispatch({
            type:D_LIST_REQUEST
        })

        const {data} = await axios.get(`/api/discussion/${id}`)

        dispatch({
            type:D_LIST_SUCCESS,
            payload:data
        })
    }
    catch(error)
    {
        dispatch({
            type:D_LIST_FAIL,
            payload:error.response && error.response.data.detail
               ? error.response.data.detail : error.message
        })
    }
}

export const ReplyD = (id , reply, name)=>async(dispatch)=>
{
    try{
        dispatch({
            type:D_REPLY_REQUEST
        })

        await axios.post(`/api/discussion/${id}`,{'reply':reply , "replier":name})

        dispatch({
            type:D_REPLY_SUCCESS
        })
    }
    catch(error)
    {
        dispatch({
            type:D_REPLY_FAIL,
            payload:error.response && error.response.data.detail
               ? error.response.data.detail : error.message
        })
    }
}
