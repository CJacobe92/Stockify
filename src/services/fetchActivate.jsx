import React from 'react'
import { API } from './fetchUtils'

const fetchActivate = async(auth) => {

  try {

    const res = await API.patch(`/auth/activate?token=${auth}`)

    if(res.status === 200){
      return res.data
    }

  } catch(err) {
    return {error: err.response.data.error}
  }
}

export default fetchActivate