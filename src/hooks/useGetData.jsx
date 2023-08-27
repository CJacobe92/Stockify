import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../providers/GlobalContextProvider';
import fetchUserData from '../services/fetchUserData';

const useGetData = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { dispatch, state } = useContext(GlobalContext)
  const { uid, auth} = state

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && uid && auth) {
        try {
          setIsLoading(true);
          
          const data = await fetchUserData(uid, auth);
          if(data){
            dispatch({ type: 'SET_DATA', data: data });
            dispatch({type: 'SET_ACCOUNTS', accounts: data.accounts})
          }
          
        } catch (error) {
          setError('Failed to fetch user data', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    window.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [uid, auth]);
  
  return { data, isLoading }
}

export default useGetData