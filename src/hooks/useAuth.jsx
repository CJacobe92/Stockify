import React, { useEffect, useState } from 'react'

const useAuth = () => {

  const storedToken = JSON.parse(localStorage.getItem('auth'));
  const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  const [token, setToken] = useState(storedToken);
  const [currentUser, setCurrentUser] = useState(storedCurrentUser);

  const signIn = (currentUser, token) => {
    localStorage.setItem('auth', JSON.stringify(token))
    localStorage.setItem('currentUser', JSON.stringify(currentUser))

    setToken(token)
    setCurrentUser(currentUser)
  }

  const signOut = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('currentUser')

    setToken('')
    setCurrentUser('')
  } 

  return {currentUser, token, signIn, signOut}
}

export default useAuth