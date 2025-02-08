import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-vw-100 min-vh-100 bg-light">
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="text-dark">¡ Hola, React-Bootstrap!</h1>
        <Button variant="primary" className="mt-3">Haz clic aquí</Button>
      </main>
      <Footer />
    </div>
  );
}

export default App;
