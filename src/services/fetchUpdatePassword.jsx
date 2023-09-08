import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './api'

const fetchUpdatePassword = () => {

  const queryClient = useQueryClient();

  return useMutation(async(variables) => {
    try {
  
      const res = await API.patch(`/auth/password_update?token=${variables.auth}`, {'auth': variables.formData})
   
      if(res.status <= 300 && res.status >= 200){
        return res.data
      }
  
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {
      queryClient.cancelQueries({queryKey: ['userData']});
      return variables
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('userData')
      return data
    }
  })
  
}

export default fetchUpdatePassword