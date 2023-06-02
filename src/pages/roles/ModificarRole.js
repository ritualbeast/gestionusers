/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import '../../styles/createRole.css';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { ConsultarPermisos, ConsultarRolPorId, ActualizarRolesConPermisos, ConsultarCanal } from '../../services/ServicesRol';

const ModificarRole = (props) => {
  
  const {handleCloseModificar, handleRefresh, roleId, rolId}= props;
  // const { , handleRefresh } = props;
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [datosRecibidosporId, setDatosRecibidosporId] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [consultaCanal, setConsultaCanal] = useState([]);
  const [error, setError] = useState("");
  const [userIdPermiso, setUserIdPermiso] = useState(roleId);
  const [camposIncompletos, setCamposIncompletos] = useState([]);
  const [formState, setFormState] = useState({
    nombre : '',
    descripcion : '',
    mnemonico : '',
    estado : '',
    usuarioCreacion : localStorage.getItem('nombreUsuario'),
    listPermisos : []
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChangePermisos = (selectedOptions) => {
    const selectedPermisos = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
      idPermiso: option.idPermiso,
      estado: option.estado
    }));
    setFormState((prevState) => ({ ...prevState, listPermisos: selectedPermisos }));
  };

  const sendData = async () => {
    try {
      const response = await ActualizarRolesConPermisos(roleId, formState);
      console.log(response.success);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ActualizarRolesConPermisos(roleId, formState);
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
          nombre : '',
          descripcion : '',
          mnemonico : '',
          estado : '',
          usuarioCreacion : '',
          listPermisos : []
        });
        // Cerrar el modal después de enviar el formulario
          setTimeout(() => {
          handleRefresh();
          handleCloseModificar(false)
        }, 1500);
      } else {
        let errorMessage = 'Error al crear el usuario';
        if (response.code === 400) {
          errorMessage = 'Ha ocurrido un error en la solicitud';
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

  useEffect(() => {
    fetchData();
    consultarCanales();
    obtenerPermisos();
    consultaPermisos();
    
  }, []);

  const obtenerPermisos = async () => {
    try {
      const data = await ConsultarPermisos(userIdPermiso);
      console.log(data)

      setPermisos(data.data.listPermisos);
      
    } catch (error) {
      console.error(error);
    }
  };
  
  const consultaPermisos = async () => {
    try{
      const response = await ConsultarPermisos();
      console.log(response.data.listPermisos)
      const canales = response.data.listPermisos
      setConsultaCanal(canales);
      
    } catch (error) {
      console.error('Error al consultar los canales:', error);
    }
  }

  const [canales, setCanales] = useState([]);
  const consultarCanales = async () => {
    try{
      const response = await ConsultarCanal();
      console.log(response.data.row)
      const canales = response.data.row
      setCanales(canales);

    }
    catch (error) {
      console.error('Error al consultar los canales:', error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await ConsultarRolPorId(roleId);
      const data = await response;
      setDatosRecibidosporId(response);
      
      setFormState({
        nombre: data.data.nombre,
        descripcion: data.data.descripcion,
        mnemonico: data.data.mnemonico,
        estado: data.data.estado,
        usuarioCreacion: localStorage.getItem('nombreUsuario'),
        listPermisos: data.data.listPermisos
      });
  
    } catch (error) {
      console.error(error);
    }
  };  
  console.log(formState);
  const opcionesCanal = consultaCanal.map((canal) => ({value: canal.nombre, label: canal.nombre}));

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Editar Rol</h2>
          {showErrorMessage && (
            <div className="error-message">Todos los campos son obligatorios</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>
                Nombre {<span className="error-message">*</span>}
              </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formState.nombre}
                placeholder="Nombre del rol"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="descripcion">
              <Form.Label>
                Descripción {<span className="error-message">*</span>}
              </Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formState.descripcion}
                placeholder="Descripción del rol"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="mnemonico">
              <Form.Label>
                Nemonico {<span className="error-message">*</span>}
              </Form.Label>
              <Form.Control
                as="textarea"
                name="mnemonico"
                value={formState.mnemonico}
                placeholder="Nombre del rol"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>
                Estado {<span className="error-message">*</span>}
              </Form.Label>
              <Form.Control
                as="select"
                name="estado"
                value={formState.estado}
                onChange={handleChange}
                required
              >
                <option value="--selecione--">--- Selecione ---</option>
                <option value="A">Activo</option>
                <option value="I">Inactivo</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="canal">
              <Form.Label>
                Canal {formState.canal === '--selecione--' && <span className="error-message">*</span>}
              </Form.Label>
              <Form.Control
                as="select"
                name="idEmpresa"
                onChange={handleChange} // Asegúrate de tener una función handleChange definida
                required
                value={formState.idEmpresa}
              >
                {canales.map((canal) => (
                  <option key={canal.idCanal} value={canal.idCanal}>{canal.nemonico}</option> // Utiliza los datos de 'canales' para generar las opciones
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="permiso">
              <Form.Label>
                Permiso {<span className="error-message">*</span>}
              </Form.Label>
              <Select
                options={permisos.map((permiso) => ({
                  value: permiso.nombre,
                  label: permiso.nombre,
                  idPermiso: permiso.idPermiso,
                  estado: permiso.estado
                }))}
                isMulti
                value={formState.listPermisos}
                onChange={handleChangePermisos}
              />
            </Form.Group>

            <Row className="justify-content-center">
              <Col md={4}>
                <Button

                  variant="primary"
                  type="submit"
                  className="btnblock"

                >
                  Modificar Rol
                </Button>
              </Col>
              
            </Row>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ModificarRole;