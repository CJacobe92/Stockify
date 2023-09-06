import React from 'react'
import { API } from './fetchUtils'
import { useMutation, useQuery } from '@tanstack/react-query'

const fetchAllUsersData = (isAdmin) => {

  return useQuery(['allUserData', isAdmin], async() => {
    try {

        if(isAdmin){
          const res = await API.get(`/users`)

          if(res.status === 200){
            return res.data
          }
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
    enabled: isAdmin,
    refetchOnWindowFocus: isAdmin ,
    refetchOnMount: isAdmin,
  })
}

export default fetchAllUsersData