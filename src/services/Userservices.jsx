import React from 'react';

const Userservices = async (info) => {
    
    try {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      const items = await data.json();
      const response = {
        data: items,
        header: '',
        body: '',
        url: '',
        error: null,
      };
      return response;
    } catch (error) {
      console.error(error);
      const response = {
        data: null,
        header: '',
        body: '',
        url: '',
        error: 'Ocurrió un error al intentar obtener los datos',
      };
      return response;
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
  
  export {
    Userservices, createUser
  }
  
