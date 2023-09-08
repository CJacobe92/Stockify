import React from 'react'
import { API } from './api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { storage } from './utils';

const fetchEnableOTP = () => {

  const queryClient = useQueryClient();
  
  return useMutation(async(context) => {
    try {

      const uid = storage.uid();
  
      const res = await API.patch(`/auth/enable_otp/${uid}`, {"auth": {"otp": context}})
      
      if(res.status === 200){
        const data = {
          auth: res.headers.authorization,
          uid:  res.headers.uid,
          activated: res.headers.activated,
          otp_enabled:  res.headers.otp_enabled,
          otp_required: res.headers.otp_required,
          user_type: res.headers.user_type
        }

        const payload = {
          uid: data.uid,
          auth: data.auth,
          isAdmin: data.user_type === 'Admin' ? true : false
        }

        storage.setRoot(payload)

        return data
      }
  
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {
      queryClient.cancelQueries({queryKey: ['userData']});
      return variables}
  })
}

export default fetchEnableOTP