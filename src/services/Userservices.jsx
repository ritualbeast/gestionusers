import React, { useState } from "react";

const LoginToken = async (info) => {
  try {
    const base64 = {
      encode: (text) => {
        return btoa(text);
      }
    };
    const credencial = {
      user: 'darambulo',
      pass: 1234
    };
    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8';
    const token = `Basic ${base64.encode(`${credencial.user}:${credencial.pass}`)}`;
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
    await ConsultaUsuarios();

  } catch (error) {
    console.error(error);
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
    localStorage.setItem('tokenValidado', data.data.token);

  } catch (error) {
    console.error(error);
  }
};



const ConsultaUsuarios = async (filterName='A', checkedItems='N') => {
  console.log(filterName);
  console.log(checkedItems);
  try {

    const tokenUsuario = localStorage.getItem('tokenValidado');
   
   
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
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/usuario/consultaUsuarios/${checkedItems}/${filterName}/?pagina=1&size=39`, requestOptions);

    const data = await response.json();
    console.log(data);
    
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






  const createUser = async (userData) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: userData.title,
        body: userData.body,
        userId: userData.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    return data;
  };

  // function delete 
  const deleteUser = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    return data;
  };

  // function update
  const updateUser = async (userData) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${userData.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          id: userData.id,
          title: userData.title,
          body: userData.body,
          userId: userData.userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    const data = await response.json();
    return data;
  };


  export {
    createUser, deleteUser, updateUser, LoginToken, ConsultaUsuarios, ValidarToken, CrearUsuario
    
  }
  
