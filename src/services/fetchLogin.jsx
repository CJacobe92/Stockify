import React, { useContext } from 'react'
import { API } from './fetchUtils'
import { useMutation } from '@tanstack/react-query'
import { DataContext } from '../providers/DataContextProvider'

export const fetchLogin = () => {

  return useMutation(async(variables) =>{
    try {

      localStorage.removeItem('root')

      const res = await API.post('/auth/login', {"auth": variables})

      if(res.status <= 300 && res.status >= 200){
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
  },{
    onMutate: (variables) => {
      return variables
    },
  })
}