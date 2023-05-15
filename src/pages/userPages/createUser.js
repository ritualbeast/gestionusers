import React, { useState } from 'react';
import '../../styles/createuser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import { includes } from 'lodash';
import Empresas from '../../_mock/empresas';

const CreateUser = () => {

  const [error, setError] = useState("");
  const [camposIncompletos, setCamposIncompletos] = useState([]);
  const notify = () => toast.error('Porfavor ingrese los campos obligatorios', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: '11px' // Tamaño de letra deseado
    }
    });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formState.name.trim() === "") {
      toast.error('Por favor ingrese los campos obligatorios', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          fontSize: '11px' // Tamaño de letra deseado
        }
      });
    } else {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            title: formState.title,
            body: formState.body,
            userId: formState.userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
      setError(false);
    }
  };

  return (
    <Container >
      <Row className="justify-content-center">
        <Col>
          < PersonIcon  style={{ width: 50, height: 50 }}/>
          <h2>Crear nuevo Usuario</h2>
          
          <Form onSubmit={handleSubmit}>
          
          <Form.Group  className='formuser' controlId="firstName">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              name="Nombres"
              value={formState.Nombres}
              onChange={handleChange}
              required
              
            />
          </Form.Group>

                <Form.Group className='formuser' controlId="lastName">
                  <Form.Label>Apellidos  <span className="required-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="Apellidos"
                    value={formState.Apellidos}
                    onChange={handleChange}
                    
                  />
                </Form.Group>
              

            <Form.Group className='formuser' controlId="email">
              <Form.Label>Correo Electronico  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="email"
                name="Correo"
                value={formState.Correo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="phone">
              <Form.Label>Telefono  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                name="Telefono"
                value={formState.Telefono}
                onChange={handleChange}
                
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="user">
              <Form.Label>Usuario  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                name="Usuario"
                value={formState.Usuario}
                onChange={handleChange}
                
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="password">
              <Form.Label>Contraseña  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="password"
                name="Contraseña"
                value={formState.Contraseña}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="company">
              <Form.Label>Empresa  <span className="required-asterisk">*</span></Form.Label>
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
                required
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
                required
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="status">
              <Form.Label>Estado  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                as="select"
                name="Estado"
                value={formState.Estado}
                onChange={handleChange}
                required
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Control>
            </Form.Group>
            <br/> 
            { error &&
              <div className="error-message">
                <Alert variant="danger" style={{ 
                  backgroundColor: '#f8d7da', 
                  borderColor: '#f5c6cb', 
                  color: '#721c24', 
                  padding: '0.75rem 1.25rem', 
                  marginBottom: '1rem', 
                  borderRadius: '0.25rem', 
                }}>
                  {error}
                </Alert>
              </div>
            }
            <Row className="justify-content-center">
              <Col md={4}>
                <Button

                  variant="primary"
                  type="submit"
                  className="btnblock"
                >
                  Crear
                </Button>
              </Col>
              
            </Row>
          </Form>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;





