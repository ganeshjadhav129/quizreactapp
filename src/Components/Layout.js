import React from 'react';

import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'
function Layout(props) {
  return (
    <>
      <Navbar fixed="top" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link style={{ textDecoration: "none", color: "white", marginRight: "10px" }} to="/home">QuizPoint</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link style={{ textDecoration: "none", color: "white", marginRight: "15px" }} to="/deskboard">Deskboard</Link>
            <Link style={{ textDecoration: "none", color: "white", marginRight: "15px" }} to="/profile">Profile</Link>
            <Link style={{ textDecoration: "none", color: "white", marginRight: "15px" }} to="/add-quiz">AddQuiz</Link>
            <Link style={{ textDecoration: "none", color: "white", marginRight: "15px" }} to="/logout">Logout</Link>
          </Nav>
        </Container>
      </Navbar>
      <div>
        {props.children}
      </div>
    </>

  )
}

export default Layout
