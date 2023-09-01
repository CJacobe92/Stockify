import React from 'react'

const fetchRegister = async(formData) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/users`

    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation
    }

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'user': payload})
    }

    const response = await fetch(baseURL, request)
    const result = await response.json();

    if (!response.ok) {
      return result
    }
    
    return result
  } catch(error) {
    console.error(error)
  }
}

export default fetchRegister