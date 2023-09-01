import React, { useContext, useEffect, useState } from 'react';
import fetchUserData from '../services/fetchUserData';
import useAuth from './useAuth';
import { DataContext } from '../providers/DataContextProvider';

const useGetData = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, state } = useContext(DataContext)
  const {currentUser, token} = useAuth();

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && currentUser && token) {
        try {
          console.log('Visibility change fetch called')
          setIsLoading(true);
          dispatch({type: 'REFETCH'})
        } catch (error) {
          setError('Failed to fetch user data: ' + error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    // Check if the document is currently visible and then trigger the initial fetch
    if (!document.hidden) {
      handleVisibilityChange();
    }

    // Attach event listener
    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser && token]);

  return { isLoading, error };
};

export default useGetData;
