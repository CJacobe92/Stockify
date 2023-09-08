import React, { useContext } from 'react'
import { API } from './api'
import { useMutation } from '@tanstack/react-query'
import { storage } from './utils'

export const fetchLogin = () => {
  
  return useMutation(async(variables) =>{
    try {

      storage.removeRoot

      const res = await API.post('/auth/login', {"auth": variables.formData})

      if(res.status <= 300 && res.status >= 200){
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
  },{
    onMutate: (variables) => {
      return variables
    },
    onSuccess: (data, variables) => {

      if(data.auth !== null ){

        if(data.user_type === 'Admin'){
        
          variables.navigate('/dashboard')

        }else if(data.user_type === 'User'){
          
          if(data.activated === "false"){
            variables.navigate('/review')
            return
          }
  
          if(data.activated === 'true' && data.otp_enabled === 'false'){
            variables.navigate('/enableotp');
            return
          }
  
          if(data.activated === 'true' && data.otp_enabled === 'true' && data.otp_required === 'true'){
            variables.navigate('/verifyotp');
            return
          }
  
          if(data.activated === 'true' && data.otp_enabled === 'true' && data.otp_required === 'false'){
            variables.navigate('/portfolio');
          }
        }
      }
    }
  })
}