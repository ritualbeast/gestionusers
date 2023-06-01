const ConsultarRoles = async (filterName='A', checkedItems='E') => {
  
  try {
    const tokenUsuario = localStorage.getItem('token');
   
    const canales = '5b538d10-fcb3-11ed-be56-0242ac120002';
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
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/roles/consultarRoles/${checkedItems}/${filterName}/?pagina=1&size=10`, requestOptions);
    const data = await response.json();
    
    return data; // Devolver los datos obtenidos

  } catch (error) {
    console.error(error);
    throw error; // Lanzar el error para que sea capturado en el lugar donde se llama a la función
  }
};

const ConsultarPermisos = async (userIdPermiso) => {
  
  const canalxDefecto = '49a5f60a-9f56-4feb-bcf1-5377c6152ef8'
  try {
    const tokenUsuario = localStorage.getItem('token');
   
    const canales = '5b538d10-fcb3-11ed-be56-0242ac120002';
    const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
      canal: canales // Cambio realizado aquí
    };
    const requestOptions = {
      method: 'GET',
      headers,
    };
    const response = await fetch(`http://desa.goitsa.me:8988/goit-security-api/v2/permisos/consultarPermisosPorIdCanal/${canalxDefecto}`, requestOptions);
    const data = await response.json();
    
    
    return data; // Devolver los datos obtenidos

  } catch (error) {
    console.error(error);
    throw error; // Lanzar el error para que sea capturado en el lugar donde se llama a la función
  }
};

const ConsultarCanal = async () => {
  try {
    const tokenUsuario = localStorage.getItem('token');
    const canal = '5b538d10-fcb3-11ed-be56-0242ac120002';
    const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
      Canal: canal
    };
    const requestOptions = {
      method: 'GET',
      headers,
    };
    const url = 'http://desa.goitsa.me:8988/goit-security-api/v2/canal/consultarCanales';
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



  export {
    ConsultarRoles,
    ConsultarPermisos,
    ConsultarCanal
 }
 