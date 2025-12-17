import React from 'react'
import { Navbar as BNavbar, Button, Container, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { clearUser } from '../../store/Slices/userSlice';

export const Navbar = () => {
  
const isLoggedIn = useSelector(state => state.user.isLoggedIn);
const dispatch = useDispatch();
const go = useNavigate(); 


const handleLogout = () => {
  dispatch(clearUser());
  localStorage.removeItem("token");
  go("/login");
}


  return (
    <BNavbar bg="dark" variant="dark" expand="lg">

        <Container>
            <BNavbar.Brand as={Link} to="/">Node-118</BNavbar.Brand>

            <BNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BNavbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto justify-content-end flex-grow-1">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                  
                    {!isLoggedIn && (
                      <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                      </>
                    )}

                    {isLoggedIn && (
                      <>
                        <Button variant="danger" onClick={handleLogout} className="ms-2">Logout</Button>
                      </>
                    )}
                </Nav>
            </BNavbar.Collapse>
        </Container>

    </BNavbar>
  )
}
