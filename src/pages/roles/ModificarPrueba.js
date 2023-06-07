/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import '../../styles/createRole.css';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { ConsultarPermisos, ConsultarRolPorId, ActualizarRolesConPermisos, ConsultarCanal } from '../../services/ServicesRol';

const ModificarRole = (props) => {
  const {handleCloseModificar, handleRefresh, roleId}= props;
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [datosRecibidosporId, setDatosRecibidosporId] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [consultaCanal, setConsultaCanal] = useState([]);
  const [error, setError] = useState("");
  const [userIdPermiso, setUserIdPermiso] = useState(roleId);
  const [camposIncompletos, setCamposIncompletos] = useState([]);
  const [datospermisos, setDatospermisos] = useState([])
  const [formState, setFormState] = useState({
    nombre : '',
    descripcion : '',
    mnemonico : '',
    estado : '',
    usuarioCreacion : localStorage.getItem('nombreUsuario'),
    listPermisos : [],
    idEmpresa: ''
  });
  const [canales, setCanales] = useState([]);
  
  const [formStateRol, setFormStateRol] = useState([]);
  const [formStateRolBase, setFormStateRolBase] = useState([]);
  const [consultaRol, setConsultaRol] = useState([]);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const objeTemp = [];

    opcionesSeleccionadas.forEach((op)=>{
        consultaRol.forEach((rol)=>{
          if(op.value === rol.nombre){
            objeTemp.push(
              {
                "idRol": rol.idRol ,
                "descripcion": rol.descripcion,
                "estado": rol.estado,
                "usuarioCreacion": userName
              }
            );
          }
        })
    })
  setFormState(objeTemp);
}, [opcionesSeleccionadas]);


  const handleChangePermisos = (selectedOptions) => {
    const selectedPermisos = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
      idPermiso: option.idPermiso,
      estado: option.estado
    }));
    setFormState((prevState) => ({ ...prevState, listPermisos: selectedOptions }));
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
  }, []);

  const obtenerPermisos = async () => {
    try {
      const idCanales = await recibirIdEmpresa()
      console.log(idCanales)
      const data = await ConsultarPermisos(idCanales);
      const permisos = data.data.listPermisos;
      console.log(data)
      setPermisos(permisos);

    } catch (error) {
      console.error(error);
    }
  };

  const consultarCanales = async () => {
    try{
      const response = await ConsultarCanal();
      const canales = response.data.row
      setCanales(canales);

    }
    catch (error) {
      console.error('Error al consultar los canales:', error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await ConsultarRolPorId(userIdPermiso);
      const data = response.data;
      console.log(data)
  
      setDatosRecibidosporId(response);
      setFormState({
        nombre: data.nombre,
        descripcion: data.descripcion,
        mnemonico: data.mnemonico,
        estado: data.estado,
        usuarioCreacion: data.usuarioCreacion,
        listPermisos: data.listPermisos,
        idEmpresa: data.listPermisos[0].idCanal
      });
      setDatospermisos(data.listPermisos)
    } catch (error) {
      console.error(error);
    }
  };

  const recibirIdEmpresa = () => {
    return new Promise((resolve) => {
      ConsultarRolPorId(userIdPermiso)
        .then((response) => {
          const data = response.data;
          console.log(data)
          resolve(data.listPermisos[0].idCanal);
        })
        .catch((error) => {
          console.error(error);
          resolve(null);
        });
    });
  };
  
  const opcionesCanal = consultaCanal.map((canal) => ({value: canal.nombre, label: canal.nombre}));

  const test = () => {
    console.log(formState.idEmpresa);
  };
 
  return (
    <Container>
      <Button onClick={test}>
          :v 
      </Button>
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

            <Form.Group controlId="permiso" className="formuser">
                <Form.Label>Permiso <span className="required-asterisk">*</span></Form.Label>
                <Select
                    options={permisos.map((permiso) => ({
                    value: permiso.nombre,
                    label: permiso.nombre,
                    idPermiso: permiso.idPermiso,
                    estado: permiso.estado
                    }))}
                    isMulti
                    value={opcionesSeleccionadas}
                    onChange={handleOptionChange}
                    components={{
                    MultiValueRemove: ({ innerProps, data }) => (
                        <span id='permisoSpan'
                        {...innerProps}
                        onClick={() => handleOptionDelete(data)}
                        onKeyPress={() => {}}
                        role="button"
                        tabIndex={0}
                        >
                        &times;
                        </span>
                    )
                    }}
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