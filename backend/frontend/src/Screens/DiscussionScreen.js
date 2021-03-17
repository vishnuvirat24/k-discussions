import React,{useEffect , useState} from 'react'
import { Button, Row , Col , Card, ListGroup} from 'react-bootstrap'
import {useDispatch , useSelector} from "react-redux"
import { listDiscussions } from '../actions/discussionAction'
import Discussions from '../components/Discussions'
import Loader from '../components/Loader'


function DiscussionScreen({history}) {

    const dispatch = useDispatch()

    const discussionList = useSelector(state=>state.discussionList)
    const { error , loading , discussions} = discussionList

    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo} = userLogin

    useEffect(()=>{
        dispatch(listDiscussions())
    },[dispatch])

    const createHandler=()=>{
        if(userInfo)
        {
        history.push("/create")
        }
        else{
            history.push("/login")
        }
    }
    return (
        <div>
            <h1>Discussion Forum</h1>
            <Row className="text-center">
                <Col>
                    <Button variant="light" size="lg" onClick={createHandler}>
                        CREATE A NEW DISCUSSION
                    </Button>
                </Col>
            </Row>
            {loading? <Loader/>:(
                   <ListGroup variant="flush">
                   {discussions.map(d=>(
                           <ListGroup.Item>
                               <Discussions d={d}/>
                           </ListGroup.Item>
                       ))}
                </ListGroup>
            )}
          
        
        </div>
    )
}

export default DiscussionScreen
