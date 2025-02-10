import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // <-- Importa PropTypes
import { Modal, Button, Form } from 'react-bootstrap';

function ClientFormModal({ show, handleClose, client, onSave }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (client) {
      setFormData(client);
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: ''
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="justify-content-center">
        <Modal.Title className="w-100 text-center">
          {client ? 'Editar Cliente' : 'Agregar Cliente'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

// 📌 Agregar validación de PropTypes
ClientFormModal.propTypes = {
  show: PropTypes.bool.isRequired,       // show debe ser un booleano obligatorio
  handleClose: PropTypes.func.isRequired, // handleClose debe ser una función obligatoria
  client: PropTypes.object,               // client puede ser un objeto (pero no es obligatorio)
  onSave: PropTypes.func.isRequired       // onSave debe ser una función obligatoria
};

export default ClientFormModal;
