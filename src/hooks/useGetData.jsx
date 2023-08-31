import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../providers/GlobalContextProvider';
import fetchUserData from '../services/fetchUserData';

const useGetData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch, state } = useContext(GlobalContext);
  const { uid, auth } = state;

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && uid && auth) {
        try {
          setIsLoading(true);

          const fetchedData = await fetchUserData(uid, auth);
          console.log('fetch on window focus called')
          if (fetchedData) {
            dispatch({ type: 'SET_DATA', data: fetchedData });
            dispatch({ type: 'SET_ACCOUNTS', accounts: fetchedData.accounts });
            dispatch({ type: 'SET_PORTFOLIOS', portfolios: fetchedData.accounts });
            dispatch({type: 'SET_TRANSACTIONS', transactions: data.accounts});
          }
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
  }, [uid, auth, dispatch]);

  return { data, isLoading, error };
};

export default useGetData;
