import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { API } from './api';

const fetchRegister = () => {

  const queryClient = useQueryClient();

  return useMutation(async(variables) => {
    try{

      const res = await API.post('/users', {"user": variables})

      if(res.status === 200){
        return res.data
      }

    }catch(err){
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {
      queryClient.cancelQueries({queryKey: ['userData']});
      return variables},
  })
  
}

export default fetchRegister