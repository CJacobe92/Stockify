import React, { useState } from 'react'
import WrappedHeader from '../../utils/WrappeHeader'
import UserSearch from '../../components/fieldsets/UserSearch'
import UserList from '../../components/cards/UserList'

const Dashboard = () => {



  return (
    <div className='h-[90vh] py-4 flex w-full flex-col'>

      <div className='w-full px-4'>
        <UserList/>
      </div>
     
    </div>
  )
}

export default WrappedHeader(Dashboard, 'Dashboard')