import React from 'react'

const fetchConfigureOTP = async(uid, auth) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/configure_otp/${uid}`

    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
    }

    const response = await fetch(baseURL, request)

    if (!response.ok) {
      console.error('Failed to fetch')
    }

    const data = await response.json();

    return data

  } catch(error) {
    console.error(error)
  }
}

export default fetchConfigureOTP