import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './NavBar.css'


const NavBar = () => {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Kalen.</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id="nav-elements" className="me-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                        <Nav.Link href="#faq">FAQ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
