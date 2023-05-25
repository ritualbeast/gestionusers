import React, { useEffect, useState } from 'react';
import '../../styles/modificaruser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import PersonIcon from '@material-ui/icons/Person';
import Empresas from '../../_mock/empresas';
import { ConsultarRolUsuario, AsignarRolUsuario } from '../../services/Roleservices';
import { ObtenerUsuarioPorId, ActualizarUsuario } from '../../services/Userservices';

const ModificarUser = (props) => {
  const { handleCloseModificar, userId, handleRefresh 
   } = props;
  // cambios nuevos
  const [datosRecibidosporId, setDatosRecibidosporId] = useState([]);
  const [error, setError] = useState("");
  const [camposIncompletos, setCamposIncompletos] = useState([]);
  const [consultaRol, setConsultaRol] = useState([]);
  const [consultarRol2, setConsultarRol2] = useState([]);
  const [UsuarioCreacion, setUsuarioCreacion] = useState([]);
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
  
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ObtenerUsuarioPorId(userId);
      const data = await response;
      setDatosRecibidosporId(response);

      setFormState({
        nombres : data.data.nombres,
        apellidos : data.data.apellidos,
        correo : data.data.correo,
        telefonoMovil : data.data.telefonoMovil,
        usuario : data.data.usuario,
        contrasenia : data.data.contrasenia,
        idEmpresa : data.data.idEmpresa,
        identificacion : data.data.identificacion,
        tipoIdentificacion : data.data.tipoIdentificacion,
        estado : data.data.estado,
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const sendData = async () => {
    try {
    
      const response = await ActualizarUsuario(userId, formState);
      console.log(response.success);
    } catch (error) {
      console.error(error);
    }
  };


 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await ActualizarUsuario(userId, formState);
      
      if (response.success === true) {
        toast.success(`${response.message}`, {
          // Configuración del toast
        });
        // Cerrar el modal después de enviar el formulario
        setTimeout(() => {
          handleRefresh();
          handleCloseModificar(false)
        }, 1500);
        

      } else {
        // Manejo de errores de respuesta
        let errorMessage = 'Error al crear el usuario';
        if (response.code === 400) {
          errorMessage = response.message;
          setCamposIncompletos(errorMessage);
        } else if (response.code === 500) {
          errorMessage = response.message;
        } else if (response.code === 401) {
          errorMessage = response.message;
        } else {
          errorMessage = 'Ha ocurrido un error inesperado';
        }
        setError(errorMessage);
        toast.error(errorMessage, {
        
          // Configuración del toast
        });
        
      }
    } catch (error) {
      console.error(error);
      setError('Error al enviar el frmulario');
      toast.error('Ha ocurrido un error inesperado, contacta al soporte técnico para obtener ayuda', {
        // Configuración del toast para el error capturado
      });
    }
  };



  const handleOptionChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    console.log(selectedValues);
    setFormState({ ...formState, rol: selectedValues });
  };

  useEffect(() => {
    consultarUsuario();
  }, []);

  const consultarUsuario = async () => {
    try {
      const response = await ObtenerUsuarioPorId(userId);
      const data = await response;
      setDatosRecibidosporId(response);
      setFormState({

        nombres : data.data.nombres,
        apellidos : data.data.apellidos,
        correo : data.data.correo,
        telefonoMovil : data.data.telefonoMovil,
        usuario : data.data.usuario,
        contrasenia : data.data.contrasenia,
        idEmpresa : data.data.idEmpresa,
        identificacion : data.data.identificacion,
        tipoIdentificacion : data.data.tipoIdentificacion,
        estado : data.data.estado,
      });
    } catch (error) {
      console.error(error);
    }
  };


  const consultarRol = async () => {
    try {
      const response = await ConsultarRolUsuario();
      
      const roles = response.data.listRoles;
      setConsultaRol(roles);
      const roles2 = response.data;
      setConsultarRol2(roles2);
      console.log(consultarRol2);
    } catch (error) {
      console.error('Error al consultar los roles:', error);
      // Manejar el error de consulta de roles
    }
  };
  const revisar = () => {
    console.log(formState);
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
          <h2>Editar Usuario</h2>
          < Form onSubmit={sendData}>
          
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
                as="select" // cambia el tipo de input a select
                name="idEmpresa"
                value={formState.idEmpresa}
                defaultValue={formState.idEmpresa[0]}
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
                onChange={handleChange}
                required
                style={getBorderStyle('tipoIdentificacion')}
              >
                <option value="">Selecciona un tipo de identificación</option>
                <option value="CED" selected={formState.tipoIdentificacion === "CED"}>Cedula de Ciudadania</option>
                {/* Agrega más opciones aquí */}
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
                  onClick={handleSubmit }
                  className="btnblock"
                >
                  Modificar usuario
                </Button>
                <Button onClick={revisar}
                >Revisar</Button>
              </Col>
            </Row>
          </Form>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default ModificarUser;
