import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ClientList from './components/ClientList';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 d-flex flex-column justify-content-center">
        <h1 className="text-dark text-center my-4">¡Hola, React-Bootstrap!</h1>
        <div className="d-flex justify-content-center">
          <ClientList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
