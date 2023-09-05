import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { API } from './fetchUtils'

const fetchLogout = () => {
  return useMutation(async() => {
    try { 
      
      const uid = JSON.parse(localStorage.getItem('root'))?.uid

      const res = await API.post(`/auth/logout/${uid}`)
  
      if(res.status <= 300 && res.status >= 200){
        console.log(res)
        localStorage.removeItem('root')
        return res.data
      }
      
    } catch(err) {
      throw err.response.data.error
    }
  })
}

export default fetchLogout