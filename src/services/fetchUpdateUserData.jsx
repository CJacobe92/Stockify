import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './api'
import { storage } from './utils';

const fetchUpdateUserData = () => {
  const queryClient = useQueryClient();

  return useMutation(async(variables) => {
    try {

      const uid = storage.uid

      const res = await API.patch(`/users/${uid}`, {"user": variables})
  
      if (res.status <= 300 && res.status >= 200) {
        return res.data
      }
  
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {
      queryClient.cancelQueries({queryKey: ['userData']});
    return variables},
    onSuccess: (data) => {
      queryClient.invalidateQueries('userData')
      return data
    }
  })
}

export default fetchUpdateUserData