/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import '../../styles/createuser.css';
import { Modal } from '@mui/material';

const CreateUser = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Crear nuevo Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;


