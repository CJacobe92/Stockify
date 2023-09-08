import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './api'
import { storage } from './utils';

  const fetchLogout = ( ) => {

    const queryClient = useQueryClient();

    return useMutation(async() => {
      try { 
        
        const uid = storage.uid();

        const res = await API.post(`/auth/logout/${uid}`)
    
        if(res.status <= 300 && res.status >= 200){
          return res.data
        }
        
      } catch(err) {
        throw err.response.data.error
      }
    }, {
      onMutate: (variables) => {
        queryClient.cancelQueries({queryKey: ['allUsersData']});
        queryClient.cancelQueries({queryKey: ['userData']});
        return variables
      },
      onSuccess: (context, variables) => {
        if(context.message == 'Logout successful'){
          storage.removeRoot()
          variables.navigate('/login')
        }
      }, 
    })
  }

  export default fetchLogout