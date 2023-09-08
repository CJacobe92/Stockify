import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './fetchUtils'

const fetchAdminUpdateUserData = () => {
  
  const queryClient = useQueryClient();

  return useMutation(async(variables) => {
    try {

      const res = await API.patch(`/users/${variables.id}`, {"user": variables.formData})
  
      if (res.status <= 300 && res.status >= 200) {
        return res.data
      }
  
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {
      queryClient.cancelQueries({queryKey: ['allUsersData']});
      return variables
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('allUserData')
      return data
    }
  })
}

export default fetchAdminUpdateUserData