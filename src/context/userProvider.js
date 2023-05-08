import React, { useState } from 'react';
import { useEffect } from 'react';
// create a context
const UserContext = React.createContext();

// create a provider

const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [users, setUsers] = useState([]);
    
    const handleChange = (e) => {
        setUserState({ ...userState, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://jsonplaceholder.typicode.com/users';
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            setUsers(resultado);
        }
        consultarAPI();
    }, []);



    
    return (
        <UserContext.Provider value={{ users, userState, handleChange, handleSubmit }}>
        {children}
        </UserContext.Provider>
    );
    }