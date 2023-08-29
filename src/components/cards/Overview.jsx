import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import AccountValue from '../fieldsets/AccountValue'
import BuyingPower from '../fieldsets/Buying Power'

const Overview = () => {


 
  return (
    <div>
      <p className='mb-2 font-semibold'>Overview</p>
      <div className='p-2 bg-white'>
        <AccountValue />
        <BuyingPower />
      </div>
        
    </div>
  )
}

export default Overview