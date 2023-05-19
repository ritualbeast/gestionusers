import React, { useEffect, useState } from 'react';
import '../../styles/createuser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import { includes } from 'lodash';
import Empresas from '../../_mock/empresas';
import { CrearUsuario } from '../../services/Userservices';


const CreateUser = ({handleCloseModal}) => {

  const [error, setError] = useState("");
  const [camposIncompletos, setCamposIncompletos] = useState([]);
  const [formState, setFormState] = useState({
    nombres : '',
    apellidos : '',
    correo : '',
    telefonoMovil : '',
    usuario : '',
    contrasenia : '',
    idEmpresa : '',
    tipoIdentificacion : '',
    identificacion : '',
    estado : '',
  });


  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const response = await CrearUsuario(formState);
        console.log(response.success);
        if (response.success === true
          ) {
          toast.success(`${response.message}`, {
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
          setFormState({
            nombres : '',
            apellidos : '',
            correo : '',
            telefonoMovil : '',
            usuario : '',
            contrasenia : '',
            idEmpresa : '',
            tipoIdentificacion : '',
            identificacion : '',
            estado : '',
          });
          // close modal after submit
          setTimeout(() => {

            handleCloseModal(false)
          }, 1500);


        } else {
          toast.error(`${response.message}`, {
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
        }
      } catch (error) {
        console.error(error);
      }
    
  };
  useEffect(() => {
    console.log(localStorage.getItem("nombreUsuario"));
    const isAdmin = localStorage.getItem("nombreUsuario");
    if (isAdmin === null) {
      window.location.href = "/login";
    }
  }, []);

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
              name="nombres"
              value={formState.nombres}
              onChange={handleChange}
              required
            />
          </Form.Group>

                <Form.Group className='formuser' controlId="lastName">
                  <Form.Label>Apellidos  <span className="required-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={formState.apellidos}
                    onChange={handleChange}
                    
                  />
                </Form.Group>
              

            <Form.Group className='formuser' controlId="email">
              <Form.Label>Correo Electronico  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formState.correo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="phone">
              <Form.Label>Telefono  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                name="telefonoMovil"
                value={formState.telefonoMovil}
                onChange={handleChange}
                
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="user">
              <Form.Label>Usuario  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={formState.usuario}
                onChange={handleChange}
                
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="password">
              <Form.Label>Contraseña  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="password"
                name="contrasenia"
                value={formState.contrasenia}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="company">
              <Form.Label>Empresa  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                as="select" // cambia el tipo de input a select
                name="idEmpresa"
                value={formState.idEmpresa}
                onChange={handleChange}
                required
              >
                {Empresas.map((empresa) => (
                  <option key={empresa.nombre} value={empresa.id}>{empresa.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>


            <Form.Group className='formuser' controlId="identificationType">
              <Form.Label>Tipo de Identificacion</Form.Label>
              <Form.Control
                as="select"
                name="tipoIdentificacion"
                value={formState.tipoIdentificacion}
                onChange={handleChange}
                required
              >
                <option value="CED">Cedula de Ciudadania</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className='formuser' controlId="identification">
              <Form.Label>Identificacion</Form.Label>
              <Form.Control

                type="text"
                name="identificacion"
                value={formState.identificacion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="status">
              <Form.Label>Estado  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                as="select"
                name="estado"
                value={formState.estado}
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