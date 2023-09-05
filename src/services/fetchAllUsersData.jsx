import React from 'react'
import { API } from './fetchUtils'
import { useMutation, useQuery } from '@tanstack/react-query'

const fetchAllUsersData = (admin) => {

  return useQuery(['allUserData', admin], async() => {
    try {

      const res = await API.get(`/users`)

      if(res.status === 200){
        return res.data
      }

    return []
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onSuccess: (data) => {
     return data
    },
    onError: (error) => {
      return error
    },
    enabled: admin
  })
}

export default fetchAllUsersData