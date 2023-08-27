import React from 'react'
import Navbar from '../components/cta/Navbar'
import usePrivateRoute from '../hooks/usePrivateRoute'
import { Navigate, Outlet } from 'react-router-dom';
import FetchLoading from '../components/spinners/FetchLoading';
import useGetData from '../hooks/useGetData';

const Layout = () => {
  const isAuthenticated = usePrivateRoute();
  const { data, isLoading } = useGetData()

  return isAuthenticated ? (
    isLoading ? <FetchLoading /> :
    <div className='flex flex-col w-full min-h-screen text-white bg-gray-900'>
      <Navbar />
      <Outlet />
    </div>
  ): (
    <Navigate to={'/login'} />
  )
}

export default Layout