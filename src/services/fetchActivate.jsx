import React from 'react'
import { API } from './fetchUtils'
import { useMutation } from '@tanstack/react-query'

const fetchActivate = () => {
  return useMutation(async(context) => {
    try {

      const res = await API.patch(`/auth/activate?token=${context}`)

      if(res.status === 200){
        return res.data
      }

    } catch(err) {
      throw err.data.response.error
    }
  }, {
    onMutate: (variables) => {
      return variables
    }
  }
  )
}

export default fetchActivate