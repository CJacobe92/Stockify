import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from './api';
import { storage } from './utils';

const fetchVerifyOTP = () => {

  const queryClient = useQueryClient();

  return useMutation(async(context) => {
    try {
      
      const uid = storage.uid

      const res = await API.post(`/auth/verify_otp/${uid}`,{auth: {otp: context}})
      
      if(res.status === 200){
        const data = {
          auth: res.headers.authorization,
          uid:  res.headers.uid,
          activated: res.headers.activated,
          otp_enabled:  res.headers.otp_enabled,
          otp_required: res.headers.otp_required,
          user_type: res.headers.user_type
        }
        
        return data
      }
    
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {
      queryClient.cancelQueries({queryKey: ['userData']});
      return variables
    }
  })
}

export default fetchVerifyOTP