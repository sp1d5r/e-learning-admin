import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/deception-detection">Deception Detection</Nav.Link>
                    <Nav.Link href="/course">Course</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;