import React from 'react'

const fetchUpdatePassword = async(formData, auth) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/password_update?token=${auth}`

    const request = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'auth'
      },
      body: JSON.stringify({'auth': formData})
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

export default fetchUpdatePassword