/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-const */

import React, { useEffect, useState } from 'react';
import '../../styles/createRole.css';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import KeyIcon from '@mui/icons-material/Key';
import Select from 'react-select';
import { ConsultarPermisos, ConsultarRolPorId, ActualizarRolesConPermisos, ConsultarCanal } from '../../services/ServicesRol';

const ModificarRole = (props) => {
  const {handleCloseModificar, handleRefresh, roleId}= props;
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [datosRecibidosporId, setDatosRecibidosporId] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [consultaCanal, setConsultaCanal] = useState([]);
  const [error, setError] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem('nombreUsuario'));
  const [userIdPermiso, setUserIdPermiso] = useState(roleId);
  const [camposIncompletos, setCamposIncompletos] = useState([]);
  const [datospermisos, setDatospermisos] = useState([])
  const [formState, setFormState] = useState({
    nombre: '',
    descripcion: '',
    mnemonico: '',
    estado: '',
    usuarioCreacion: nombreUsuario,
    listPermisos: [],
    idEmpresa: ''
  });
  const [canales, setCanales] = useState([]);
  const [selectedPermisos, setSelectedPermisos] = useState([]);
  const [formStatePermiso, setFormStatePermiso] = useState([]);
  const [formStatePermisoBase, setFormStatePermisoBase] = useState([]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    setSelectedPermisos(
      formState.listPermisos
        .filter(permiso => permiso.estado === "A")
        .map((permiso) => ({
          value: permiso.nombre,
          label: permiso.nombre,
          idPermiso: permiso.idPermiso,
          estado: permiso.estado,
        }))
    );
  }, [formState.listPermisos]);  
  
  const handleChangePermisos = (selectedOptions) => {
    setSelectedPermisos(selectedOptions);
  
    // Guardar los datos actualizados en listPermisos
    const updatedListPermisos = selectedOptions.map(option => ({
      nombre: option.value,
      idPermiso: option.idPermiso,
      estado: option.estado
    }));
    setFormState(prevState => ({
      ...prevState,
      listPermisos: updatedListPermisos
    }));
  };

  useEffect(() => {
    const objeTemp = [];

    selectedPermisos.forEach((op)=>{
      permisos.forEach((permiso)=>{
          if(op.value === permiso.nombre){
            objeTemp.push(
              {
                "idPermiso": permiso.idPermiso,
                "idCanal": permiso.idEmpresa,
                "nombre": permiso.nombre,
                "estado": permiso.estado
              }
            );
          }
        })
    })

  setFormStatePermiso(objeTemp);
}, [selectedPermisos]);
  
  // const handleDelete = (removedOption) => {
  //   // Verificar si el estado actual del permiso es diferente de "I"
  //   if (removedOption.estado !== "I") {
  //     // Actualizar el estado del permiso a "I"
  //     const updatedPermisos = selectedPermisos.map(option => {
  //       if (option === removedOption) {
  //         return {
  //           ...option,
  //           estado: "I"
  //         };
  //       }
  //       return option;
  //     });
  
  //     setSelectedPermisos(updatedPermisos);
  
  //     // Imprimir los permisos con estado "A" e "I"
  //     const activePermisos = updatedPermisos.filter(option => option.estado === "A");
  //     const inactivePermisos = updatedPermisos.filter(option => option.estado === "I");
  //     console.log("Permisos activos:", activePermisos);
  //     console.log("Permisos inactivos:", inactivePermisos);
  //   } else {
  //     // El permiso ya se encuentra en estado "I", mostrar mensaje de error o realizar otra acción
  //     console.log("El permiso ya se encuentra en estado I");
  //   }
  // };   
   
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

      console.log('roles del usuario:', formStatePermiso);

      let objSendI = [];
      formStatePermisoBase.forEach(element => {
        let validate=false;
        formStatePermiso.forEach(el => {
          if (element.idRol === el.idRol) { 
            console.log('element.idRol', element.idRol);
            console.log('el.idRol', el.idRol);         

            validate=true
          }   
        });
        console.log(validate);
        if (validate === false) console.log('inactiva:', element.idRol)
        if (!validate) element.estado = 'I';
        if (!validate) objSendI.push(element);
      });

      console.log(formStatePermisoBase)
      console.log(formStatePermiso)
      console.log(objSendI)


      let objSend = [];

      if (objSendI.length !== 0) {
        objSend = formStatePermiso;
        objSendI.forEach((data) =>{
          objSend.push(data);
        })
        
      }else{
        objSend = formStatePermiso
      }

      console.log('objSend', objSend)
    } catch (error) {
      console.error(error);
      setError('Error al enviar el formulario');
    }
  };

  useEffect(() => {
    fetchData();
    consultarCanales();
    obtenerPermisos();
   // consultaPermisos();
  }, []);

  const obtenerPermisos = async () => {
    try {
      const idCanales = await recibirIdEmpresa()
      const data = await ConsultarPermisos(idCanales);
      const permisos = data.data.listPermisos;
      setPermisos(permisos);

    } catch (error) {
      console.error(error);
    }
  };
  
  // const consultaPermisos = async () => {
  //   try {
  //     const response = await ConsultarPermisos(permisoCanalId); // Pasa userIdPermiso como argumento
  //     const canales = response.data.listPermisos;
  //     setConsultaCanal(canales);

  //   } catch (error) {
  //     console.error('Error al consultar los canales:', error);
  //   }
  // };

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

      setDatosRecibidosporId(response);
      setFormState({
        nombre: data.nombre,
        descripcion: data.descripcion,
        mnemonico: data.mnemonico,
        estado: data.estado,
        usuarioCreacion: nombreUsuario,
        listPermisos: data.listPermisos || [],
        idEmpresa: data.listPermisos && data.listPermisos.length > 0 ? data.listPermisos[0].idCanal : ''
      });      
      setDatospermisos(data.listPermisos)

      const permisos = response.data && response.data.listRoles;
      if (permisos) {
        setSelectedPermisos(
          permisos.map((permiso) => ({
            nombre: permiso.value,
            idPermiso: permiso.idPermiso,
            estado: permiso.estado
          }))
        );
      }

      const objeTemp = [];


      permisos.forEach((permiso)=>{
          objeTemp.push(
            {
              "idPermiso": permiso.idPermiso,
              "idCanal": permiso.idEmpresa,
              "nombre": permiso.nombre,
              "estado": permiso.estado
            }
          );

      })
      setFormStatePermisoBase(objeTemp)
    } catch (error) {
      console.error(error);
    }
  };

  const recibirIdEmpresa = () => {
    return new Promise((resolve) => {
      ConsultarRolPorId(userIdPermiso)
        .then((response) => {
          const data = response.data;
          resolve(data.listPermisos[0].idCanal);
        })
        .catch((error) => {
          console.error(error);
          resolve(null);
        });
    });
  };
  
  // const opcionesCanal = consultaCanal.map((canal) => ({value: canal.nombre, label: canal.nombre}));

  const test = () => {
    console.log(formState);
  };
 
  return (
    <Container>
      <Button onClick={test}>
          :v 
      </Button>
      <Row className="justify-content-center">
        <Col md={6}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <KeyIcon style={{ width: 50, height: 50 }} />
        </div>
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
                value={selectedPermisos}
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