import React, { useState } from "react";

const ConsultarRolUsuario = async () => {
  try {
    const idRol = localStorage.getItem('data')
    console.log(idRol);
    const requestOptions = {
      method: 'GET',
    };
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/usuario/roles/consultarRolPorUsuario/${idRol}`, requestOptions);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const AsignarRolUsuario = async (datosRolUsuario, idUsuario) => {
  try {
    const canales = '49a5f60a-9f56-4feb-bcf1-5377c6152efSA';
    const headers = {
      'Canal': canales
    };
    const body = {
        "idUsuario": idUsuario,
        "listRoles":[
          {
            "idRol": datosRolUsuario.idRol,
            "descripcion": datosRolUsuario.descripcion,
            "estado": datosRolUsuario.estado,
            "usuarioCreacion": datosRolUsuario.usuarioCreacion,
          }

        ]
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(body)
    };
    const response = await fetch('http://desa.goitsa.me:8988/goit-security-api/v2/usuario/roles/asignarRolUsuario', requestOptions);
    const data = await response.json();
    console.log(data);
    return data; // Devolver los datos obtenidos
  } catch (error) {
    console.error(error);
    throw error; // Lanzar el error para que sea capturado en el lugar donde se llama a la función
  }
};
  export {
    ConsultarRolUsuario,
    AsignarRolUsuario
  }