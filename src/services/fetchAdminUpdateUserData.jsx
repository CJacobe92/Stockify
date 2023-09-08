import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './api'

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
    onMutate: async (variables) => {
      await queryClient.cancelQueries({queryKey: ['allUsersData']});
      return variables
    },

    onError: (err) => {
      console.error(err)
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries('allUserData')
      return data
    }
  })
}

export default fetchAdminUpdateUserData