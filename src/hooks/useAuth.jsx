import React, { useContext } from 'react'
import { DataContext } from '../providers/DataContextProvider';

const useAuth = () => {
  const { state } = useContext(DataContext)
  const auth = state?.auth
  return auth !== null ? true : false;
}

export default useAuth