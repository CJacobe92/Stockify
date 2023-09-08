import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './fetchUtils'

const fetchDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(async(variables) => {
    try {

      const res = await API.delete(`/users/${variables}`)
  
      if (res.status <= 300 && res.status >= 200) {
        return res.data
      }
  
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {
      queryClient.cancelQueries({queryKey: ['allUsersData']});

      return variables}
      ,
    onSuccess: (data) => {
      queryClient.invalidateQueries('allUserData')
      return data
    }
  })
}

export default fetchDeleteUser