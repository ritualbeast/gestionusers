import React, { useState } from 'react';
import '../../styles/modificaruser.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import Empresas from '../../_mock/empresas';


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
          < PersonIcon  style={{ width: 50, height: 50 }}/>
          <h2>Editar Usuario</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
              <Form.Group className='formuser' controlId="firstName">
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
                <Form.Group className='formuser' controlId="lastName">
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

            <Form.Group className='formuser' controlId="email">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                name="Correo"
                value={formState.Correo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="phone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="Telefono"
                value={formState.Telefono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="user">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="Usuario"
                value={formState.Usuario}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="Contraseña"
                value={formState.Contraseña}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="company">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                as="select" // cambia el tipo de input a select
                name="Empresa"
                value={formState.Empresa}
                onChange={handleChange}
                required
              >
                {Empresas.map((empresa) => (
                  <option key={empresa.nombre} value={empresa.nombre}>{empresa.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className='formuser' controlId="identificationType">
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

            <Form.Group className='formuser' controlId="identification">
              <Form.Label>Identificacion</Form.Label>
              <Form.Control

                type="text"
                name="Identificacion"
                value={formState.Identificacion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="status">
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
                  Modificar
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
