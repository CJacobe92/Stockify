import React from 'react'
import { API } from './api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { storage } from './utils';

export const fetchSellTransaction = () => {

  const queryClient = useQueryClient();

  return useMutation(async(context) => {

    try{
      const uid = storage.uid
      const account_id = context.account_id
      const stock_id = context.stock_id
      const formData = context.formData

      const payload = {
        transaction: formData, 
        stock_id: stock_id
      }

      const res = await API.post(`/users/${uid}/accounts/${account_id}/transactions`, payload)

      if(res.status <= 300 && res.status >= 200 ){
        return {message: 'Order successful'}
      }
    }catch(err){
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
    },
    onError: (error) => {
      console.error(error)
    }
  });
};

export default fetchSellTransaction