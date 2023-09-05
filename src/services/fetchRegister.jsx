import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { API } from './fetchUtils'

const fetchRegister = () => {

  return useMutation(async(variables) => {
    try{

      const res = await API.post('/users', {"user": variables})

      if(res.status === 200){
        return res.data
      }

    }catch(err){
      throw err.response.data.error
    }
  }, {
    onMutate: (variables) => {return variables},
  })
  
}

export default fetchRegister