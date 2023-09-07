import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './fetchUtils'

const fetchPasswordReset = () => {
  
  const queryClient = useQueryClient();

  return useMutation(async(variables) =>{
    try {

      const res = await API.post('/auth/password_reset', {'auth': variables})
  
      if (res.status <= 300 && res.status >= 200) {
        return res.data
      }
  
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {
      queryClient.cancelQueries({queryKey: ['userData']});
      return variables}
  })
    
}

export default fetchPasswordReset