import React from 'react'
import { API } from './fetchUtils'

const fetchConfigureOTP = async(h) => {

  try {

    const uid = JSON.parse(localStorage.getItem('root'))?.currentUser

    const res = await API.get(`/auth/configure_otp/${uid}`)

    if(res.status ===  200){
      return res.data
    }

  } catch(err) {
    return {error: err.response.data.error}
  }
}

export default fetchConfigureOTP