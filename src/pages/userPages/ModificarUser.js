import React, { useState } from 'react';
import '../../styles/modificaruser.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const ModificarUser = () => {
  const [formState, setFormState] = useState({
    Nombres: '',
    Apellidos: '',
    Correo: '',
    Telefono: '',
    Usuario: '',
    Contraseña: '',
    Empresa: '',
    TipodeIdentificacion: '',
    Identificacion: '',
    Estado: '',
  });

  const [botonCancelar, setBotonCancelar] = useState('');

  const handleCancel = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container >
      <Row className="justify-content-center">
        <Col>
          <h2>Crear nuevo Usuario</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    name="Nombres"
                    value={formState.Nombres}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    name="Apellidos"
                    value={formState.Apellidos}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="email">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                name="Correo"
                value={formState.Correo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="Telefono"
                value={formState.Telefono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="user">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="Usuario"
                value={formState.Usuario}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="Contraseña"
                value={formState.Contraseña}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="company">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                type="text"
                name="Empresa"
                value={formState.Empresa}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="identificationType">
              <Form.Label>Tipo de Identificacion</Form.Label>
              <Form.Control
                as="select"
                name="TipodeIdentificacion"
                value={formState.TipodeIdentificacion}
                onChange={handleChange}
              >
                <option value="CC">Cedula de Ciudadania</option>
                <option value="CE">Cedula de Extranjeria</option>
                <option value="NIT">NIT</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="identification">
              <Form.Label>Identificacion</Form.Label>
              <Form.Control

                type="text"
                name="Identificacion"
                value={formState.Identificacion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="Estado"
                value={formState.Estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Control>
            </Form.Group>

            <Row className="justify-content-center">
              <Col md={4}>
                <Button

                  variant="primary"
                  type="submit"
                  className="btn-block"
                >
                  Crear
                </Button>
              </Col>
              
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ModificarUser;
