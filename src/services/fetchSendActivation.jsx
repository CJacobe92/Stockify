import React, { useContext } from 'react'
import { API } from './fetchUtils'
import { useMutation } from '@tanstack/react-query'

export const fetchSendActivation = () => {

  return useMutation(async(variables) =>{
    try {

      const res = await API.post('/auth/activation', {"auth": variables.formData})

      if(res.status <= 300 && res.status >= 200){
        return res.data
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