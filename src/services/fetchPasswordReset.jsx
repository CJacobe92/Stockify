import React from 'react'

const fetchPasswordReset = async(formData) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/password_reset`

    const payload = {
      email: formData.email,
    }

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'auth': payload})
    }

    const response = await fetch(baseURL, request)
    const result = await response.json()


    if (!response.ok) {
      return result
    }

    return result

  } catch(error) {
    console.error(error)
  }
}

export default fetchPasswordReset