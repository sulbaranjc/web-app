import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import imagenLogo from '../assets/logosolo.png';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-3">
      <Container fluid>
        {/* Logo de la empresa */}
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            alt="Logo"
            src={imagenLogo}
            width="50"
            height="50"
            className="d-inline-block me-2"
          />
        </Navbar.Brand>
        
        {/* Menú de navegación */}
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
        
        {/* Título centrado */}
        <Navbar.Text className="mx-auto fw-bold text-center">
          Trabajo de FrontEnd con React y Reacy-Bootstrap.
        </Navbar.Text>
        
        {/* Opciones alineadas a la derecha */}
        <Nav className="ms-auto">
          <Nav.Link href="#login">Iniciar Sesión</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
