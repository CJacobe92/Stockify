import React from 'react'
import { API } from './fetchUtils'

const fetchAllUsersData = async(auth) => {

  try {

    const res = await API.get(`/users`)  

    if(res.status === 200){
      return res.data
    }

  } catch(err) {
    return {error: err.response.data.error}
  }
}

export default fetchAllUsersData