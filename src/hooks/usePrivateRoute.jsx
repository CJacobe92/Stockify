import React, { useContext } from 'react'
import { DataContext } from '../providers/DataContextProvider';
import useAuthToken from './useAuth';

const usePrivateRoute = () => {
  const { auth } = useAuthToken()
  return auth !== null ? true : false;
}

export default usePrivateRoute