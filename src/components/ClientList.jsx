import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('/data/clients.json')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Lista de Clientes</h2>
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
                <Button variant="warning" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ClientList;
