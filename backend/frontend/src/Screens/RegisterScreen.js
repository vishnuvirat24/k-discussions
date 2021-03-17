
import React,{useState,useEffect} from 'react'
import {Form, Row , Col , Button} from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {register} from "../actions/userAction"

import FormContainer from '../components/FormContainer'

function RegisterScreen({location,history}) {

    const [registerUsername , setRegisterUsername] = useState('')
    const [registerPassword , setRegisterPassword] = useState('')

    const dispatch = useDispatch()


    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, success } = userRegister

   
    useEffect(() => {

        if(success)
        {
            history.push("/login")
        }
    }, [history ,success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(registerUsername,registerPassword))
    }



    return (
        <FormContainer>
                <h1>Register</h1>
                
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='username'
                            placeholder='Enter name'
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Enter Password'
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Button type='submit' variant='primary'>
                        Register
                    </Button>

                </Form>

                <Row className='py-3'>
                    <Col>
                        Have an Account? <Link
                            to="/login">
                            Sign In
                            </Link>
                    </Col>
                </Row>
        </FormContainer>
    )
}

export default RegisterScreen
