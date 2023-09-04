import React from 'react'

const fetchVerifyOTP = async(uid, auth, pin) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/verify_otp/${uid}`

    const payload = {
      otp: pin
    }

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({auth: payload})
    }

    const response = await fetch(baseURL, request)

    if (!response.ok) {
      console.error('Failed to fetch')
    }

    const data = {
      auth: response.headers.get('Authorization'),
      uid:  response.headers.get('Uid'),
      activated: response.headers.get('Activated'),
      otp_enabled:  response.headers.get('Otp_enabled'),
      otp_required: response.headers.get('Otp_required'),
      userType: response.headers.get('User-Type'),
      res: response
    }

    return data

  } catch(error) {
    console.error(error)
  }
}

export default fetchVerifyOTP