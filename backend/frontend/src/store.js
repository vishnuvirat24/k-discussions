import { createStore, combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {discussionListReducer , dListReducer , dReplyReducer} from "./reducers/discussionReducer"
import {discussionCreateReducer } from './reducers/discussionReducer'
import {userRegisterReducer , userLoginReducer} from "./reducers/userReducer"


const reducer = combineReducers({
    discussionList:discussionListReducer,
    discussionCreate:discussionCreateReducer,
    userRegister:userRegisterReducer,
    userLogin :userLoginReducer,
    dList:dListReducer,
    dReply:dReplyReducer
})


const middleware = [thunk]

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null
const initialState={
    userLogin :{userInfo: userInfoFromStorage}
}
const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store