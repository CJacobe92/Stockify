import React, { useContext } from 'react'
import { GlobalContext } from '../providers/GlobalContextProvider';

const usePrivateRoute = () => {
  const { state } = useContext(GlobalContext);
  return state.auth !== null ? true : false;
}

export default usePrivateRoute