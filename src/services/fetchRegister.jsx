import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { API } from './fetchUtils'

const fetchRegister = () => {

  return useMutation(async(context) => {
    try{

      const res = await API.post('/users', {"user": context})

      if(res.status === 200){
        return res.data
      }

    }catch(err){
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {return variables}
  })
  
}

export default fetchRegister