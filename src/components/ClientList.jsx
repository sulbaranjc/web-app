import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ClientFormModal from './ClientFormModal.jsx';

/**
 * Componente que muestra una lista de clientes con opciones para agregar, editar y eliminar.
 */
function ClientList() {
  // Estado para almacenar la lista de clientes
  const [clients, setClients] = useState([]);
  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);
  // Estado para almacenar el cliente seleccionado para editar o agregar
  const [selectedClient, setSelectedClient] = useState(null);

  /**
   * useEffect para cargar los datos de los clientes al montar el componente.
   */
  useEffect(() => {
    fetchClients();
  }, []);

  /**
   * Obtiene la lista de clientes desde el backend.
   */
  const fetchClients = () => {
    fetch('http://127.0.0.1:8000/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error al cargar los datos:', error));
  };

  /**
   * Maneja la eliminación de un cliente por su ID.
   * @param {number} id - ID del cliente a eliminar.
   */
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/clients/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Filtrar la lista para eliminar el cliente eliminado
          setClients(clients.filter(client => client.id !== id));
        } else {
          console.error('Error al eliminar el cliente');
        }
      })
      .catch(error => console.error('Error al eliminar el cliente:', error));
  };

  /**
   * Maneja la creación o actualización de un cliente.
   * @param {Object} client - Objeto con los datos del cliente.
   */
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
          // Agregar el nuevo cliente a la lista
          setClients([...clients, data]);
        } else {
          // Actualizar el cliente en la lista
          setClients(clients.map(c => (c.id === data.id ? data : c)));
        }
        setShowModal(false); // Cerrar el modal
      })
      .catch(error => console.error('Error al guardar el cliente:', error));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Lista de Clientes</h2>
      <div className="d-flex justify-content-start mb-2">
        {/* Botón para crear un nuevo cliente */}
        <Button variant="primary" onClick={() => { 
          setSelectedClient(null); // Se resetea el cliente seleccionado para un nuevo registro
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
                {/* Botón para editar un cliente existente */}
                <Button variant="warning" size="sm" className="me-2" onClick={() => { 
                  setSelectedClient(client); // Se almacena el cliente seleccionado para edición
                  setShowModal(true); 
                }}>
                  Editar
                </Button>
                {/* Botón para eliminar un cliente */}
                <Button variant="danger" size="sm" onClick={() => handleDelete(client.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Modal para agregar/editar clientes, pasando los datos necesarios mediante props */}
      <ClientFormModal
        show={showModal} // Control de visibilidad del modal
        handleClose={() => setShowModal(false)} // Función para cerrar el modal
        client={selectedClient} // Se pasa el cliente seleccionado para edición, o null si es nuevo
        onSave={handleSave} // Función para guardar cambios
      />
    </Container>
  );
}

export default ClientList;
