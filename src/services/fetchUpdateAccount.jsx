import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { storage } from './utils';
import { API } from './api';

const fetchUpdateAccount = () => {
  
  const queryClient = useQueryClient();

  return useMutation(async(variables) => {
    try {
      
      const uid = storage.uid();

      const res = await API.patch(`/users/${uid}/accounts/${variables.account_id}`, {'account': variables.formData})
  
      if (res.status <= 300 && res.status >= 200) {
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
  })

}

export default fetchUpdateAccount
