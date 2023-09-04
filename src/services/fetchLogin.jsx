import React from 'react'

const fetchLogin = async(formData) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/login`

    const payload = {
      email: formData.email,
      password: formData.password
    }

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'auth': payload})
    }

    const response = await fetch(baseURL, request)

    if (!response.ok) {
      const result = await response.json()
      return result
    }else if(response.ok){
      const data = {
        auth: response.headers.get('Authorization'),
        uid:  response.headers.get('Uid'),
        activated: response.headers.get('Activated'),
        otp_enabled:  response.headers.get('Otp_enabled'),
        otp_required: response.headers.get('Otp_required'),
        userType: response.headers.get('User-Type')
      }
  
      return data
    }
  } catch(error) {
    console.error(error)
  }
}

export default fetchLogin