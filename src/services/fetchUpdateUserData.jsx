import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './fetchUtils'

const fetchUpdateUserData = () => {
  const queryClient = useQueryClient();

  return useMutation(async(variables) => {
    try {

      const uid = JSON.parse(localStorage.getItem('root'))?.uid

      const res = await API.patch(`/users/${uid}`, {"user": variables})
  
      if (res.status <= 300 && res.status >= 200) {
        return res.data
      }
  
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {return variables},
    onSuccess: (data) => {
      queryClient.invalidateQueries('userData')
      return data
    }
  })
}

export default fetchUpdateUserData