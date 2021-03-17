import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row , Col , Form , Button  } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import axios from "axios"
import { login } from '../actions/userAction'

import FormContainer from '../components/FormContainer'

function LoginScreen({location , history}) {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(loginUsername,loginPassword))
    }
    return (
        <FormContainer>
            {}
            <h1>Login In</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='username'
                        placeholder='Enter name'
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                
                <Button type='submit' variant='primary'>
                    Login In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New User? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen