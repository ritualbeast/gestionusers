/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import '../../styles/createRole.css';

const Editar = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    description: '',
    estado: '--selecione--',
    canal: '--selecione--',
    permisos: [] 
  });
  
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isPermisosSelected, setIsPermisosSelected] = useState(false);
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === 'checkbox' && name === 'permisos') {
      const updatedPermisos = { ...formState.permisos, [value]: checked };
      setFormState(prevState => ({ ...prevState, permisos: updatedPermisos }));
      setIsPermisosSelected(Object.values(updatedPermisos).some(permission => permission));
    } else {
      setFormState(prevState => ({ ...prevState, [name]: value }));
    }
  };    
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.firstName || !formState.description || formState.estado === '--selecione--' || formState.canal === '--selecione--' || formState.permisos.length === 0) {
      setShowErrorMessage(true);
    } else {
      // Lógica para enviar los datos del formulario
      setShowErrorMessage(false);
    }
  };

  const handleCancel = () => {
    window.location.href = '/dashboard/roles';
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Editar Rol</h2>
          {showErrorMessage && (
            <div className="error-message">Todos los campos son obligatorios</div>
          )}
          <form onSubmit={handleSubmit}>
              <div className={`form-group ${!formState.firstName && 'has-error'}`}>
                  <label htmlFor="firstName" className="form-label">
                    Nombre {!formState.firstName && <span className="error-message">*</span>}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${!formState.firstName && 'border-red'}`}
                    id="firstName"
                    name="firstName"
                    placeholder='Nombre del rol'
                    value={formState.firstName}
                    onChange={handleChange}
                    required
                  />
              </div>
              
              <div className={`form-group ${!formState.description && 'has-error'}`}>
                  <label htmlFor="description" className="form-label">
                    Descripción {!formState.description && <span className="error-message">*</span>}
                  </label>
                  <textarea
                    className={`form-control ${!formState.description && 'border-red'}`}
                    id="description"
                    name="description"
                    placeholder='Descripción del rol'
                    value={formState.description}
                    onChange={handleChange}
                    required
                  />
              </div>              
              
              <div className={`form-group ${formState.estado === '--selecione--' && 'has-error'}`}>
                  <label htmlFor="status" className="form-label">
                    Estado {formState.estado === '--selecione--' && <span className="error-message">*</span>}
                    </label>
                  <select
                    className={`form-control ${formState.estado === '--selecione--' && 'border-red'}`}
                    id="status"
                    name="estado"
                    value={formState.estado}
                    onChange={handleChange}
                    required
                  >
                      <option value="--selecione--">--- Selecione ---</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                  </select>
              </div>

              <div className="form-group">
                  <label htmlFor="canal" className="form-label">
                    Canal {formState.canal === '--selecione--' && <span className="error-message">*</span>}
                    </label>
                  <select
                    className={`form-control ${formState.canal === '--selecione--' && 'border-red'}`}
                    id="canal"
                    name="canal"
                    value={formState.canal}
                    onChange={handleChange}
                    required
                  >
                      <option value="--selecione--">--- Selecione ---</option>
                      <option value="Notify">Notify</option>
                      <option value="NotiSurvey">NotiSurvey</option>
                  </select>
              </div>

              <div className={`crear-5 ${!isPermisosSelected ? 'border-red' : ''}`} style={{ borderColor: !isPermisosSelected ? 'red' : '' }}>
                  <label 
                    htmlFor="permisos" 
                    className="form-label"
                  >
                    Permisos {!isPermisosSelected && <span className="error-message">*</span>}
                  </label>
                  <div className='div-crear'>
                      <div className='elegir-opciones'>
                        <label>Dashboard</label>
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Ver1"
                            checked={formState.permisos.Ver1 || false}
                            onChange={handleChange}
                          />
                          Ver
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Crear1"
                            checked={formState.permisos.Crear1 || false}
                            onChange={handleChange}
                          />
                          Crear
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Actualizar1"
                            checked={formState.permisos.Actualizar1 || false}
                            onChange={handleChange}
                          />
                          Actualizar
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Eliminar1"
                            checked={formState.permisos.Eliminar1 || false}
                            onChange={handleChange}
                          />
                          Eliminar
                        </label>
                        {/* Agrega más opciones aquí */}
                      </div>

                      <div className='elegir-opciones'>
                        <label>Usuarios</label>
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Ver2"
                            checked={formState.permisos.Ver2 || false}
                            onChange={handleChange}
                          />
                          Ver
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Crear2"
                            checked={formState.permisos.Crear2 || false}
                            onChange={handleChange}
                          />
                          Crear
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Actualizar2"
                            checked={formState.permisos.Actualizar2 || false}
                            onChange={handleChange}
                          />
                          Actualizar
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Eliminar2"
                            checked={formState.permisos.Eliminar2 || false}
                            onChange={handleChange}
                          />
                          Eliminar
                        </label>
                        {/* Agrega más opciones aquí */}
                      </div>

                      <div className='elegir-opciones'>
                        <label>Clientes</label>
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Ver3"
                            checked={formState.permisos.Ver3 || false}
                            onChange={handleChange}
                          />
                          Ver
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Crear3"
                            checked={formState.permisos.Crear3 || false}
                            onChange={handleChange}
                          />
                          Crear
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Actualizar3"
                            checked={formState.permisos.Actualizar3 || false}
                            onChange={handleChange}
                          />
                          Actualizar
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            name="permisos"
                            value="Eliminar3"
                            checked={formState.permisos.Eliminar3 || false}
                            onChange={handleChange}
                          />
                          Eliminar
                        </label>
                        {/* Agrega más opciones aquí */}
                      </div>
                  </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Guardar
              </button>

              <button type="submit" className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editar;


