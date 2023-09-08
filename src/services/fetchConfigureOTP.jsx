import React from 'react'
import { API } from './api'
import { useQuery } from '@tanstack/react-query'
import { storage } from './utils'

const fetchConfigureOTP = () => {
  return useQuery(['configureOTP'], async() => {
    try {

      const uid = storage.uid();
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