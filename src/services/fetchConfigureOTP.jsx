import React from 'react'
import { API } from './fetchUtils'
import { useQuery } from '@tanstack/react-query'

const fetchConfigureOTP = () => {
  return useQuery(['configureOTP'], async() => {
    try {

      const uid = JSON.parse(localStorage.getItem('root'))?.uid
  
      const res = await API.get(`/auth/configure_otp/${uid}`)
  
      if(res.status ===  200){
        return res.data
      }
  
    } catch(err) {
       throw err.response.data.error
    }
  }, {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: true,
  })
  
}

export default fetchConfigureOTP