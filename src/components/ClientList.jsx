import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ClientFormModal from './ClientFormModal.jsx';

const API_BASE_URLS = [
  'http://localhost:8080/clients', // Backend Java
  'http://127.0.0.1:8000/api/clients', // Backend PHP
  'https://api-clients.sulbaranjc.website/api/clients' //Backend php nube.
];

const fetchWithFallback = async (urlOptions, fetchOptions = {}) => {
  for (const url of urlOptions) {
    try {
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error(`Error con el endpoint ${url}:`, error);
    }
  }
  throw new Error('No se pudo completar la solicitud con ninguno de los endpoints.');
};

function ClientList() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await fetchWithFallback(API_BASE_URLS);
      setClients(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchWithFallback(API_BASE_URLS.map(url => `${url}/${id}`), { method: 'DELETE' });
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  const handleSave = async (client) => {
    const method = client.id ? 'PUT' : 'POST';
    const urls = client.id ? API_BASE_URLS.map(url => `${url}/${client.id}`) : API_BASE_URLS;

    try {
      const data = await fetchWithFallback(urls, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
      });

      if (method === 'POST') {
        setClients([...clients, data]);
      } else {
        setClients(clients.map(c => (c.id === data.id ? data : c)));
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Lista de Clientes</h2>
      <div className="d-flex justify-content-start mb-2">
        <Button variant="primary" onClick={() => {
          setSelectedClient(null);
          setShowModal(true);
        }}>
          Crear Cliente
        </Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.first_name}</td>
              <td>{client.last_name}</td>
              <td>{client.phone_number}</td>
              <td>{client.email}</td>
              <td>{client.address}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => {
                  setSelectedClient(client);
                  setShowModal(true);
                }}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(client.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ClientFormModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
        onSave={handleSave}
      />
    </Container>
  );
}

export default ClientList;
