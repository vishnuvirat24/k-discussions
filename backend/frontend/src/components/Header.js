import React from 'react'
import { Navbar , Nav, Container , NavDropdown  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from "react-router-bootstrap"
import {logout} from "../actions/userAction"


function Header() {

   

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()
    const logoutHandler=()=>
    {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
               <Container>
                   <LinkContainer to="/">
                      <Navbar.Brand>K-Discussions</Navbar.Brand>
                   </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            
                            {userInfo? (
                                        
                                    <NavDropdown title={userInfo.username} id='username'>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                    </NavDropdown>
                                        

                                    
                                ) : (
                                        <LinkContainer to='/login'>
                                            <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                        </LinkContainer>
                                    )}
                        </Nav>
                    </Navbar.Collapse>
               </Container>
            </Navbar>
        </header>
    )
}

export default Header
