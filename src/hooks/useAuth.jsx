import React, { useContext } from 'react'
import { DataContext } from '../providers/DataContextProvider';

const useAuth = () => {
  const { auth } = useContext(DataContext)
  return auth !== '' ? true : false;
}

export default useAuth