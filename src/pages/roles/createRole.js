/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import '../../styles/createRole.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { ConsultarPermisos, ConsultarCanal } from '../../services/ServicesRol';

const CreateRole = (props) => {
  const { userIdPermiso } = props;
  const [formState, setFormState] = useState({
    firstName: '',
    description: '',
    estado: '--selecione--',
    canal: '--selecione--',
    permisos: []
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [permisos, setPermisos] = useState([]);
  const [consultaCanal, setConsultaCanal] = useState([]);
  
  const handleChange = (event) => {
    const { name, value, type } = event.target;
  };

  const handleChangePermisos = (selectedOptions) => {
    const selectedPermisos = selectedOptions.map((option) => option.value);
    setFormState({ ...formState, permisos: selectedPermisos });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.firstName || !formState.description || formState.estado === '--selecione--') {
      setShowErrorMessage(true);
    } else {
      // Lógica para enviar los datos del formulario
      setShowErrorMessage(false);
    }
  };

  const handleCancel = () => {
    window.location.href = '/dashboard/roles';
  };

  useEffect(() => {
    const obtenerPermisos = async () => {
      try {
        const data = await ConsultarPermisos(userIdPermiso);
        setPermisos(data.data.listPermisos);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPermisos();
  }, [userIdPermiso]);

  useEffect(() => {
    consultaPermisos();
    consultarCanales();
  }, []);

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
  
  const opcionesCanal = consultaCanal.map((canal) => ({value: canal.nombre, label: canal.nombre}));

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Crear nuevo Rol</h2>
          {showErrorMessage && (
            <div className="error-message">Todos los campos son obligatorios</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName" className={`form-group ${!formState.firstName && 'has-error'}`}>
              <Form.Label>
                Nombre {!formState.firstName && <span className="error-message">*</span>}
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Nombre del rol"
                value={formState.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className={`form-group ${!formState.description && 'has-error'}`}>
              <Form.Label>
                Descripción {!formState.description && <span className="error-message">*</span>}
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Descripción del rol"
                value={formState.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="status" className={`form-group ${formState.estado === '--selecione--' && 'has-error'}`}>
              <Form.Label>
                Estado {formState.estado === '--selecione--' && <span className="error-message">*</span>}
              </Form.Label>
              <Form.Control
                as="select"
                name="estado"
                value={formState.estado}
                onChange={handleChange}
                required
              >
                <option value="--selecione--">--- Selecione ---</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
                Permiso {formState.canal === '--selecione--' && <span className="error-message">*</span>}
              </Form.Label>
              <Select
                options={permisos.map((permiso) => ({
                  value: permiso.nombre,
                  label: permiso.nombre,
                }))}
                isMulti
                value={formState.permisos.map((permiso) => ({
                  value: permiso,
                  label: permiso,
                }))}
                onChange={handleChangePermisos}
              />
            </Form.Group>

            <Button type="submit" className="btn btn-primary">
              Crear nuevo Rol
            </Button>

            <Button type="submit" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateRole;


