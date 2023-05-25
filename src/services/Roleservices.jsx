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

// const ActualizarRolUsuario = async (datosRolUsuario) => {
//   try {
//     const tokenUsuario = localStorage.getItem('tokenValidado');
//     const token = `Bearer ${tokenUsuario}`;
//     const body = {
//       "listRoles": [
//           {
//               "idRol": datosRolUsuario.idRol,
//               "descripcion": datosRolUsuario.descripcion,
//               "estado": datosRolUsuario.estado,
//               "usuarioActualizacion": datosRolUsuario.usuarioActualizacion,
//           }
//       ]
//     };
//     const requestOptions = {
//       method: 'PUT',
//       body: JSON.stringify(body)
//     };
//     const response = await fetch('http://localhost:8989/goit-security-api/v2/usuario/roles/actualizarRolUsuario/42583c31-4299-4b8e-86a6-f4426fd3fda8', requestOptions);
//     const data = await response.json();
//     console.log(data);

//     return data; // Devolver los datos obtenidos

//   } catch (error) {
//     console.error(error);
//     throw error; // Lanzar el error para que sea capturado en el lugar donde se llama a la función
//   }
// };

  export {
    ConsultarRolUsuario, 
    // ActualizarRolUsuario
  }
  