import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap";

function NavigationBar() {
    const [nmode, setNMode] = useState(false);

    const switchNight = () => {
        let root;
        root = document.querySelector(":root");
        if (nmode){
            root.style.setProperty("--white", "#fff");
            root.style.setProperty("--black", "#000");
            root.style.setProperty("--text", "#212529");
            root.style.setProperty("--course-card", "#fff");
            root.style.setProperty("--light-green", "#f6ffe8");
            root.style.setProperty("background", "#fff");
        } else {
            root.style.setProperty("--white", "#2e2e2e");
            root.style.setProperty("--black", "#fff");
            root.style.setProperty("--text", "#fff");
            root.style.setProperty("--course-card", "#212529");
            root.style.setProperty("--light-green", "#212529");
            root.style.setProperty("background", "#2e2e2e");
        }

        setNMode(!nmode);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Admin Panel</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/deception-detection">Deception Detection</Nav.Link>
                </Nav>
                <Button variant={nmode ? "dark" : "light"} onClick={() => {switchNight()}}>
                    {`${nmode? "Light" : "Dark"}mode`}
                </Button>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;