import React, { useContext } from 'react'
import { API } from './fetchUtils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DataContext } from '../providers/DataContextProvider'

export const fetchLogin = () => {

  const queryClient = useQueryClient();

  return useMutation(async(variables) =>{
    try {

      localStorage.removeItem('root')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('isUser')

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
      queryClient.cancelQueries({queryKey: ['userData']});
      queryClient.cancelQueries({queryKey: ['allUsersData']});
      return variables
    },
  })
}