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

      const previousData =  queryClient.getQueryData(['userData'])
      const newData = variables.allUsersData

      const updatedData = {
        ...previousData,
        ...newData,
      };
      
      queryClient.setQueryData(['userData'], updatedData)

      return variables && previousData
    },

    onError: (err,context) => {
      queryClient.setQueryData(['allUsersData'], context)
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries('allUserData')
      return data
    }
  })
}

export default fetchAdminUpdateUserData