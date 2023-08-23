import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='flex flex-row justify-between p-10'>
      <p>
        Landing Page
      </p>
      
      <div>
        <Link to={'/login'} className='p-2 m-2 text-white bg-indigo-700'>Login</Link>
        <Link to={'/register'} className='m-2'>Register</Link>
      </div>
      
    </div>
  )
}

export default Landing