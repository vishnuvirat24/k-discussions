import React, { useState , useEffect } from 'react'
import { Form , Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {createDiscussion} from '../actions/discussionAction'
import { useSelector , useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from "../components/Message"
import {DISCUSSION_CREATE_RESET} from '../constants/discussionConstants'

function CreateScreen({history}) {

    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const discussionCreate = useSelector(state=>state.discussionCreate)
    const{loading , error , success} = discussionCreate

    const userLogin = useSelector(state=>state.userLogin)
    const{userInfo} = userLogin

    useEffect(() => {
        dispatch({type:DISCUSSION_CREATE_RESET})

        if(success)
        {
            history.push("/")
        }
    }, [history , success,dispatch , userInfo])

    const submitHandler=(e)=>
    {
        e.preventDefault()
        if(userInfo)
        {
        dispatch(createDiscussion(name,title,description))
        }
        else{
            history.push("/login")
        }
    }
    return (
        <div>
            <FormContainer>
                <h1>Create A Discussion</h1>
                    <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type='title'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" row={5}
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Create
                        </Button>

                    </Form>
            </FormContainer >
            
        
        </div>
    )
}

export default CreateScreen
