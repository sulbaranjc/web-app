import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" className="mt-auto py-3 justify-content-center w-100">
      <Container className="text-center">
        <Navbar.Text className="text-light d-block">
          By Ing. Juan Carlos Sulbarán
        </Navbar.Text>
        <Nav className="mt-2 justify-content-center">
          <Nav.Link href="https://www.facebook.com" target="_blank">
            <Image src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="30" height="30" alt="Facebook" />
          </Nav.Link>
          <Nav.Link href="https://www.youtube.com" target="_blank">
            <Image src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width="30" height="30" alt="YouTube" />
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com" target="_blank">
            <Image src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png" width="30" height="30" alt="Instagram" />
          </Nav.Link>
          <Nav.Link href="https://www.twitter.com" target="_blank">
            <Image src="https://cdn-icons-png.flaticon.com/512/733/733635.png" width="30" height="30" alt="Twitter" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
