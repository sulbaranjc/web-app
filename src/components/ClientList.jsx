import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ClientFormModal from './ClientFormModal.jsx';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error al cargar los datos:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/clients/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setClients(clients.filter(client => client.id !== id));
        } else {
          console.error('Error al eliminar el cliente');
        }
      })
      .catch(error => console.error('Error al eliminar el cliente:', error));
  };

  const handleSave = (client) => {
    const method = client.id ? 'PUT' : 'POST';
    const url = client.id ? `http://127.0.0.1:8000/api/clients/${client.id}` : 'http://127.0.0.1:8000/api/clients';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    })
      .then(response => response.json())
      .then(data => {
        if (method === 'POST') {
          setClients([...clients, data]);
        } else {
          setClients(clients.map(c => (c.id === data.id ? data : c)));
        }
        setShowModal(false);
      })
      .catch(error => console.error('Error al guardar el cliente:', error));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Lista de Clientes</h2>
      <div className="d-flex justify-content-start mb-2">
        <Button variant="primary" onClick={() => { setSelectedClient(null); setShowModal(true); }}>Crear</Button>
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
                <Button variant="warning" size="sm" className="me-2" onClick={() => { setSelectedClient(client); setShowModal(true); }}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(client.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ClientFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        client={selectedClient}
        onSave={handleSave}
      />
    </Container>
  );
}

export default ClientList;