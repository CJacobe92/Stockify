import React from 'react'
import { API } from './api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const fetchActivate = () => {

  const queryClient = useQueryClient();

  return useMutation(async(variables) => {
    try {

      const res = await API.patch(`/auth/activate?token=${variables}`)

      if(res.status === 200){
        return res.data
      }

    } catch(err) {
      throw err.data.response.error
    }
  }, {
    onMutate: async (variables) => {
      await queryClient.cancelQueries({queryKey: ['userData']});
      return variables
    }
  }
  )
}

export default fetchActivate