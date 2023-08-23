export const fetchRegister = async(formData) => {

  const baseURL = `${import.meta.env.VITE_API_URL}/users`

  const payload = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    password: formData.password,
    password_confirmation: formData.password_confirmation
  }

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'user': payload})
  }
  const response = await fetch(baseURL, requestOptions)

  return response
}

export const fetchLogin = async(formData) => {

  const baseURL = `${import.meta.env.VITE_API_URL}/auth/login`

  const payload = {
    email: formData.email,
    password: formData.password
  }

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'auth': payload})
  }
  const response = await fetch(baseURL, requestOptions)

  if (response.ok) {
    const payload = {
      uid: response.headers.get('Uid'),
      auth: response.headers.get('Authorization'),
      activated: response.headers.get('Activated'),
      otp_enabled: response.headers.get('Otp_enabled'),
      ok: true
    }

    return payload
  } else {
    console.error('Failed to fetch')
  }
}

export const fetchActivateAccount  = async(auth) => {

  const baseURL = `${import.meta.env.VITE_API_URL}/auth/activate?token=${auth}`

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth 
    }
  }
  
  const response = await fetch(baseURL, requestOptions)

  if (response.ok) {
    return response
  } else {
    console.error('Failed to fetch')
  }
}

export const fetchConfigureOTP = async(uid, auth) => {

  const baseURL = `${import.meta.env.VITE_API_URL}/auth/configure_otp/${uid}`

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth}`
    },
  }
  const response = await fetch(baseURL, requestOptions)

  if (response.ok) {
    const result = await response.json()
    return result
  } else {
    console.error('Failed to fetch')
  }
}

export const fetchEnableOTP = async(uid, auth, pin) => {

  const baseURL = `${import.meta.env.VITE_API_URL}/auth/enable_otp/${uid}`

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth 
    },
    body: JSON.stringify({'auth': {"otp": pin}})
  }
  const response = await fetch(baseURL, requestOptions)

  if (response.ok) {
    const payload = {
      uid: response.headers.get('Uid'),
      auth: response.headers.get('Authorization'),
      activated: response.headers.get('Activated'),
      otp_enabled: response.headers.get('Otp_enabled'),
      ok: true
    }

    return payload
  } else {
    console.error('Failed to fetch')
  }
}

export const fetchVerifyOTP = async(uid, auth, pin) => {

  const baseURL = `${import.meta.env.VITE_API_URL}/auth/verify_otp/${uid}`

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth 
    },
    body: JSON.stringify({'auth': {"otp": pin}})
  }
  const response = await fetch(baseURL, requestOptions)

  if (response.ok) {
    const payload = {
      uid: response.headers.get('Uid'),
      auth: response.headers.get('Authorization'),
      activated: response.headers.get('Activated'),
      otp_enabled: response.headers.get('Otp_enabled'),
      ok: true
    }

    return payload
  } else {
    console.error('Failed to fetch')
  }
}








