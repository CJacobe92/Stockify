import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/cta/Navbar'
import usePrivateRoute from '../hooks/usePrivateRoute'
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../providers/GlobalContextProvider';
import { useFetchUserData} from '../providers/ApiFetch';
import FetchLoading from '../components/spinners/FetchLoading';

const Layout = () => {
  const isAuthenticated = usePrivateRoute();

  const {data: data, isLoading, isError, error, isFetching} = useFetchUserData()
  
  if(isLoading || isFetching){
    return <FetchLoading />
  }
  
  if(isError){
    console.log(error.message)
  }
  
  console.log(data && data.accounts)
  
  return isAuthenticated ? (
    <div className='flex flex-col w-full min-h-screen text-white bg-gray-900'>
      <Navbar />
    </div>
  ): (
    <Navigate to={'/login'} />
  )
}

export default Layout