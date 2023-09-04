import React, { useState } from 'react'
import WrappedHeader from '../../utils/WrappeHeader'
import UserSearch from '../../components/fieldsets/UserSearch'
import UserList from '../../components/cards/UserList'

const Dashboard = () => {

  const [input, setInput] = useState({email: ''})

  const handleChange = (e) => {
    setInput({...input, email: e.target.value})
  }

  return (
    <div className='h-[90vh] py-4 flex justify-center w-full flex-row justify-between'>
      <div>
        <UserSearch handleChange={handleChange}/>
      </div>
      
      <div className='w-full px-4'>
        <UserList input={input}/>
      </div>
     
    </div>
  )
}

export default WrappedHeader(Dashboard, 'Dashboard')