import React, { useState } from "react";

const LoginToken = async (usuario, contrasenia) => {
  try {
    const base64 = {
      encode: (text) => {
        return btoa(text);
      }
    };
    
    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8';
    const token = `Basic ${base64.encode(`${usuario}:${contrasenia}`)}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
      'Canal': canales
    };
    const requestOptions = {
      method: 'POST',
      headers
    };
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/autenticacion/login`, requestOptions);
    const data = await response.json();
   
    // Guardar los valores en el localStorage
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('data', data.data.idUsuario);
    
    await ValidarToken();
    
    return data; // Retornar los datos
    
  } catch (error) {
    console.error(error);
    throw error; // Lanzar el error para que sea capturado en el lugar donde se llama a la función

  }
};


const ValidarToken = async (info) => {
  try {
    const idUsuario = localStorage.getItem('data');
    const tokenUsuario = localStorage.getItem('token');
    console.log(tokenUsuario);

    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8';
    const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
      Canal: canales
    };
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        idUsuario
      })
    };
    
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/autenticacion/validar-login`, requestOptions);
    const data = await response.json();
    console.log(data);
    localStorage.setItem('tokenValidado', data.data.token);
    localStorage.setItem('nombreUsuario', data.data.nombres);
    localStorage.setItem('correoUsuario', data.data.correo);
    console.log(localStorage.getItem('nombreUsuario'));
    await ConsultaUsuarios();
    

  } catch (error) {
    console.error(error);
  }
};



const ConsultaUsuarios = async (filterName='A', checkedItems='N') => {
  
  try {

    const tokenUsuario = localStorage.getItem('token');
   
   
    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8';
    const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
      Canal: canales
    };
    const requestOptions = {
      method: 'GET',
      headers,
    };
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/usuario/consultaUsuarios/${checkedItems}/${filterName}/?pagina=1&size=100`, requestOptions);

    const data = await response.json();
    
    return data; // Devolver los datos obtenidos

  } catch (error) {
    console.error(error);
    throw error; // Lanzar el error para que sea capturado en el lugar donde se llama a la función
  }
};

const CrearUsuario = async (datosUsuario) => {
  try {
    const tokenUsuario = localStorage.getItem('tokenValidado');
    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8';
    const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
      'Canal': canales
    };
    const body = {
      "usuario": datosUsuario.usuario,
      "contrasenia": datosUsuario.contrasenia,
      "idEmpresa": datosUsuario.idEmpresa,
      "correo": datosUsuario.correo,
      "nombres": datosUsuario.nombres,
      "apellidos": datosUsuario.apellidos,
      "telefonoMovil": datosUsuario.telefonoMovil,
      "estado": datosUsuario.estado,
      "tipoIdentificacion": datosUsuario.tipoIdentificacion,
      "identificacion": datosUsuario.identificacion
    };
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    };
    const response = await fetch('http://desa.goitsa.me:8988/goit-security-api/v2/usuario/crearUsuario', requestOptions);
    const data = await response.json();
    console.log(data);

    return data; // Devolver los datos obtenidos

  } catch (error) {
    console.error(error);
    throw error; // Lanzar el error para que sea capturado en el lugar donde se llama a la función
  }
};


const EliminarUsuario = async (userId) => {
  try {
    const tokenUsuario = localStorage.getItem('token');
    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8';
    const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
      Canal: canales
    };
    const requestOptions = {
      method: 'DELETE',
      headers,
    };
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/usuario/eliminarUsuario/${userId}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ObtenerUsuarioPorId = async (userId) => {
  try {
    const tokenUsuario = localStorage.getItem('token');
    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8';
    const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
      'Canal': canales
    };
    const requestOptions = {
      method: 'GET',
      headers,
    };
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/usuario/ObtenerUsuarioPorId/${userId}`, requestOptions);
    const data = await response.json();
    console.log(data);
    

    return data; // Devolver los datos obtenidos

  } catch (error) {
    console.error(error);
    throw error; // Lanzar el error para que sea capturado en el lugar donde se llama a la función
  }
};

const ActualizarUsuario = async (userId, userData) => {
  try {
    const tokenUsuario = localStorage.getItem('token');
    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8';
    const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
      'Canal': canales
    };
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(userData)
    };
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/usuario/actualizar/${userId}`, requestOptions);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




  export {
     LoginToken, ConsultaUsuarios, ValidarToken, CrearUsuario, EliminarUsuario, ObtenerUsuarioPorId, ActualizarUsuario
    
  }
  
