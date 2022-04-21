import React, {useState} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBar = props => {
    const [active, setActive] = useState('default');

    return (<Navbar bg="light" variant={"light"} expand="lg">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    className="me-auto"
                    activeKey={active}
                     onSelect={(selectedKey) => setActive(selectedKey!)}>
                    <Nav.Link as={Link} to={"/"} eventKey={'home'}>Анализ тематики</Nav.Link>
                    <Nav.Link as={Link} to={'/search'} eventKey={'similar'}>Поиск похожих статей</Nav.Link>
                    <Nav.Link as={Link} to={'/monitoring'} eventKey={'monitoring'}>Мониторинг</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
}
export default NavBar;