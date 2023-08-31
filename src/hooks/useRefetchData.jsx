import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../providers/GlobalContextProvider';
import fetchUserData from '../services/fetchUserData';

const useRefetchData = () => {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { dispatch, state } = useContext(GlobalContext)
  const { uid, auth} = state

  const refetch = async() => {
    try {
       if (uid, auth) {
        const data = await fetchUserData(uid, auth)
        console.log('Refetch data called')
          if(data) {
            dispatch({type: 'SET_DATA', data: data })
            dispatch({type: 'SET_ACCOUNTS', accounts: data.accounts})
            dispatch({type: 'SET_PORTFOLIOS', portfolios: data.accounts})
          }
       }
    } catch(error){
      setError(error)
      console.error(error)
    }
  }
  
  return { data, isLoading, refetch}
}

export default useRefetchData