import React from 'react'
import AccountValue from '../fieldsets/AccountValue'
import BuyingPower from '../fieldsets/Buying Power'


const Overview = () => {

  return (
    <div className='mb-6'>
      <p className='mb-2 text-lg font-semibold'>Overview</p>
      <div className='p-2 bg-white'>
        <AccountValue />
        <BuyingPower />
      </div>
        
    </div>
  )
}

export default Overview