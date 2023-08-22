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