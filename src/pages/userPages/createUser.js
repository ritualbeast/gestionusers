import React, { useState } from 'react';
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
    nombres: "",
    apellidos: "",
    correo: "",
    telefonoMovil: "",
    usuario: "",
    contrasenia: "",
    idEmpresa: Empresas.length > 0 ? Empresas[0].id : "",
    tipoIdentificacion: "",
    identificacion: "",
    estado: "A",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let sanitizedValue = value;
  
    if (name === 'telefonoMovil' || name === 'identificacion') {
      sanitizedValue = value.replace(/\s+/g, '').replace(/\D/g, '').slice(0, 10);
    } else if (name === 'correo' || name === 'usuario' || name === 'contrasenia') {
      sanitizedValue = value.replace(/\s+/g, '');
    }
  
    setFormState((prevState) => ({
      ...prevState,
      [name]: sanitizedValue,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCamposIncompletos([]);
    
    try {
      const response = await CrearUsuario(formState);
      console.log(response.success);
      if (response.success === true) {
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
          idEmpresa : '1',
          tipoIdentificacion : '',
          identificacion : '',
          estado : 'A',
        });
        // Cerrar el modal después de enviar el formulario
        setTimeout(() => {
          handleCloseModal(false)
        }, 1500);
      } else {
        let errorMessage = 'Error al crear el usuario';
        if (response.code === 400) {
          errorMessage = response.message;
          setCamposIncompletos(errorMessage);
        } else if (response.code === 500) {
          errorMessage = 'Ha ocurrido un error en el servidor';
        } else if (response.code === 401) {
          errorMessage = 'No estás autorizado para realizar esta acción';
        }
        setError(errorMessage);
        toast.error(errorMessage, {
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
      setError('Error al enviar el formulario');
    }
  };


  const getBorderStyle = (fieldName) => {
    if (formState[fieldName] === '' && fieldName !== 'identificacion' && fieldName !== 'tipoIdentificacion') {
      return { borderColor: '#E5664B' };
    }
    if (formState[fieldName] !== '' && fieldName !== 'identificacion' && fieldName !== 'tipoIdentificacion') {
      return { borderColor: '#ced4da' };
    }
    return {};
  };
  
  
  return (
    <Container >
      <Row className="justify-content-center">
        <Col>
          < PersonIcon  style={{ width: 50, height: 50 }}/>
          <h2>Crear nuevo Usuario</h2>
          
          <Form onSubmit={handleSubmit}>
          
            <Form.Group  className='formuser' controlId="firstName">
            <Form.Label>Nombres <span className="required-asterisk">*</span></Form.Label>
            <Form.Control
              type="text"
              name="nombres"
              value={formState.nombres}
              onChange={handleChange}
              required
              style={getBorderStyle('nombres')}
            />
            </Form.Group>

            <Form.Group className='formuser' controlId="lastName">
                  <Form.Label>Apellidos  <span className="required-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={formState.apellidos}
                    onChange={handleChange}
                    required
                    style={getBorderStyle('apellidos')}
                  />
            </Form.Group>
              
            <Form.Group className='formuser' controlId="email">
              <Form.Label>Correo Electronico  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formState.correo}
                onChange={handleChange}
                required
                style={getBorderStyle('correo')}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="phone">
              <Form.Label>Telefono  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                name="telefonoMovil"
                value={formState.telefonoMovil}
                onChange={handleChange}
                required
                style={getBorderStyle('telefonoMovil')}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="user">
              <Form.Label>Usuario  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={formState.usuario}
                onChange={handleChange}
                required
                style={getBorderStyle('usuario')}
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
                style={getBorderStyle('contrasenia')}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="company">
              <Form.Label>Empresa  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                as="select"
                name="idEmpresa"
                value={formState.idEmpresa}
                onChange={handleChange}
                required
                style={getBorderStyle('idEmpresa')}
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
                defaultValue={formState.tipoIdentificacion[0]}
                onChange={handleChange}
                style={getBorderStyle('tipoIdentificacion')}
                
              >
                <option value="">Seleccione...</option>
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
                style={getBorderStyle('identificacion')}
              />
            </Form.Group>

            <Form.Group className='formuser' controlId="status">
              <Form.Label>Estado  <span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                as="select"
                name="estado"
                value={formState.estado}
                onChange={handleChange}
                defaultValue={formState.estado[0]}
                required
                style={getBorderStyle('estado')}
              >
                <option value="A">Activo</option>
                <option value="I">Inactivo</option>
              </Form.Control>
            </Form.Group>
            <br/> 
            
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