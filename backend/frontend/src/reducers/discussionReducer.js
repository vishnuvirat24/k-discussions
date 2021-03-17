import { DISCUSSION_LIST_REQUEST , DISCUSSION_LIST_SUCCESS , DISCUSSION_LIST_FAIL  , DISCUSSION_CREATE_REQUEST , DISCUSSION_CREATE_SUCCESS , DISCUSSION_CREATE_FAIL , DISCUSSION_CREATE_RESET ,D_LIST_FAIL , D_LIST_REQUEST , D_LIST_SUCCESS, D_LIST_RESET ,D_REPLY_RESET,D_REPLY_FAIL , D_REPLY_SUCCESS , D_REPLY_REQUEST } from '../constants/discussionConstants'


export const discussionListReducer=( state={discussions:[]},action)=>
{
    switch(action.type)
    {
        case DISCUSSION_LIST_REQUEST:
            return{loading:true , discussions:[]}
        
         case DISCUSSION_LIST_SUCCESS:
            return{loading:false , discussions:action.payload}

        case DISCUSSION_LIST_FAIL:
            return{loading:false , error:action.payload}
        
        default:
            return state
    }
}

export const discussionCreateReducer=( state={},action)=>
{
    switch(action.type)
    {
        case DISCUSSION_CREATE_REQUEST:
            return{loading:true ,...state}
        
         case DISCUSSION_CREATE_SUCCESS:
            return{loading:false , success:true}

        case DISCUSSION_CREATE_FAIL:
            return{loading:false , error:action.payload}

        case DISCUSSION_CREATE_RESET:
            return {}
        
        default:
            return state
    }
}


export const dListReducer=( state={d:[]},action)=>
{
    switch(action.type)
    {
        case D_LIST_REQUEST:
            return{loading:true }
        
         case D_LIST_SUCCESS:
            return{loading:false , success:true , d:action.payload}

        case D_LIST_FAIL:
            return{loading:false , error:action.payload}

        case D_LIST_RESET:
            return {}
        
        default:
            return state
    }
}

export const dReplyReducer=( state={},action)=>
{
    switch(action.type)
    {
        case D_REPLY_REQUEST:
            return{loading:true }
        
         case D_REPLY_SUCCESS:
            return{loading:false , success:true}

        case D_REPLY_FAIL:
            return{loading:false , error:action.payload}

        case D_REPLY_RESET:
            return {}
        
        default:
            return state
    }
}



