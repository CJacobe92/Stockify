import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { API } from './fetchUtils'

const fetchPasswordReset = () => {
  return useMutation(async(variables) =>{
    try {

      const res = await API.post('/auth/password_reset', {'auth': variables})
  
      if (res.status <= 300 && res.status >= 200) {
        return res.data
      }
  
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {return variables}
  })
    
}

export default fetchPasswordReset