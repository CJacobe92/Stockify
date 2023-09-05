import React from 'react'
import { API } from './fetchUtils'
import { useMutation } from '@tanstack/react-query'

export const fetchLogin = () => {
  return useMutation(async(context) =>{
    try {

      if(context){
        const res = await API.post('/auth/login', {"auth": context})

        const data = {
          auth: res.headers.authorization,
          uid:  res.headers.uid,
          activated: res.headers.activated,
          otp_enabled:  res.headers.otp_enabled,
          otp_required: res.headers.otp_required,
          user_type: res.headers.user_type
        }

        localStorage.setItem('root', JSON.stringify({auth: data.auth, uid: data.uid, user_type: data.user_type}))

        return data
      }

    } catch(err) {
      throw err.response.data.error
    } 
  },{
    onMutate: (variables) => {
      return variables
    }
  })
}