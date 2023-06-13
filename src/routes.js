import React, { useEffect, useState } from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CreateUser from './pages/userPages/createUser';
import RolesPage from './pages/Roles';
import refreshServices from './services/refreshServices';

// ----------------------------------------------------------------------

export default function Router() {
 /* const [user, setUser] = useState(localStorage.getItem('loggedUser'))
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const loggedUserJson = localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      console.log(user);
      setUser(user)
    }
   // verificaToken()
  }, [])

  const verificaToken = async () => {
    await refreshServices.verificaToken()
    setTimeout(() => {
      verificaToken()
    }, 600000)
    setLoad(true)
    console.log('cargar')
  }
  
   setTimeout(() => {
    refreshTokenVerifyInactivity();
  }, 1000 * 60 * 60);  
 
  const refreshTokenVerifyInactivity = async (event) => {
    const resp = await refreshServices.refreshTokenInactivity({})
    if (resp.expire_date) {
      await refreshServices.logOut({})
    }
  }
*/
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'createUser', element: <CreateUser /> },
        { path: 'role', element: <RolesPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/user" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    
  ]);

  return routes;
}
