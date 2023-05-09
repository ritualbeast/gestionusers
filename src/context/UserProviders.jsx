import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const UserContext = createContext();

const UserProviders = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
        const url = `https://jsonplaceholder.typicode.com/todos`
        const { data } = await axios.get(url)
        setTodos(data)
        console.log(data)
      }
      consultarAPI()
  }, []);

  return (
    <UserContext.Provider value={{ todos }}>
        {children}
    </UserContext.Provider>

  );
};

export { UserProviders, UserContext

}
