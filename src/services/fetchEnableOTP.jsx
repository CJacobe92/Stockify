import React from 'react'
import { API } from './fetchUtils'

const fetchEnableOTP = async(pin) => {

  try {

    const uid = JSON.parse(localStorage.getItem('root'))?.currentUser

    const res = await API.patch(`/auth/enable_otp/${uid}`, {"auth": {"otp": pin}})
    
    if(res.status === 200){
      const data = {
        auth: res.headers.authorization,
        uid:  res.headers.uid,
        activated: res.headers.activated,
        otp_enabled:  res.headers.otp_enabled,
        otp_required: res.headers.otp_required,
        userType: res.headers.user_type
      }
  
      return data
    }

  } catch(err) {
    return {error: err.response.data.error}
  }
}

export default fetchEnableOTP