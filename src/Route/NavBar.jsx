import { React } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { Link } from 'react-router-dom';

export const NavBar = () => {

  return (
    <>
    
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container className='container_nav'>
          <Navbar.Brand as={Link} to="Home" className="brand-custom">Imprenta</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navb">
              <Nav.Link as={Link} to="Clientes" className="nav-link-custom">
                <div className="nav-item">
                  <div>Clientes</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="CrearVenta" className="nav-link-custom">
                <div className="nav-item">
                  <div>Crear Venta</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="Ventas" className="nav-link-custom">
                <div className="nav-item">
                  <div>Ventas</div>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
