import React,{useEffect, useState} from 'react'
import { Button, Row , Col , Card, Form, ListGroup , Badge} from 'react-bootstrap'
import {Link} from "react-router-dom"
import {listD , ReplyD} from "../actions/discussionAction"
import Discussions from "../components/Discussions"
import { useDispatch , useSelector } from 'react-redux'
import  {D_REPLY_RESET} from "../constants/discussionConstants"
import Loader from '../components/Loader'
import Message from "../components/Message"

function ReplyScreen({match}) {

    const [comment , setComment]= useState("")
    const dispatch = useDispatch()



    const dList = useSelector(state=>state.dList)
    const {success ,d} = dList

    const dReply = useSelector(state=>state.dReply)
    const { success: replySuccess} = dReply

    const userLogin = useSelector(state=>state.userLogin)

    const{userInfo} = userLogin



    useEffect(()=>
    {
        if(replySuccess)
        {
            setComment("")
            dispatch({
                type:D_REPLY_RESET
            })
        }
        dispatch(listD(match.params.id))

    },[dispatch ,match , replySuccess])

    const submitHandler=(e)=>
    {
        e.preventDefault()
        dispatch(ReplyD( match.params.id , comment,userInfo.username))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {success?(
            <div>
                <Card className="my-3">
                    <Card.Header style={{color:"white"}}><Badge pill variant="success"><h6>Author: {d.name}</h6></Badge>{" "}</Card.Header>
                    <Card.Body>
                        <Card.Title>Topic: <Badge variant="dark">{d.title}</Badge></Card.Title>
                        <Card.Text style={{color:"white"}}>
                            {d.description}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <ListGroup variant='flush'>
                    <h1>Replies</h1>
                    {d.replies.map((reply) => (
                        <div class="card p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="user d-flex flex-row align-items-center"><span><small class="font-weight-bold text-primary">{reply.replier}</small> <small class="font-weight-bold">{reply.reply}</small></span> </div> 
                        </div>

                    </div>
                    ))}
                </ListGroup>
                {userInfo ? (
                     <Form onSubmit={submitHandler}>               
                     <Form.Group controlId='reply'>        
                         <Form.Label>Shoot a reply</Form.Label>
                         <Form.Control
                             as='textarea'
                             row='5'
                             value={comment}
                             onChange={(e) => setComment(e.target.value)}
                         ></Form.Control>
                     </Form.Group>
 
                     <Button
                         type='submit'
                         variant='primary'
                     >
                         Submit
                     </Button>
                 </Form>
                ):( <Message variant='info'>Please <Link to='/login'>login</Link> to reply</Message>)}
               
            </div>

            ):(<Loader/>)}
        </div>
        
    )
}

export default ReplyScreen