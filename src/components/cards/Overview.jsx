import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'

const Overview = () => {

  const { state } = useContext(GlobalContext)
  const accounts = state.accounts
 
  return (
    <div className='w-full h-40'>
        <p className='mb-2 font-semibold text-white'>Overview</p>
        {accounts && accounts.map((account, index) => (
          <div className='h-40 p-2 text-black bg-white' key={index}>
            <p className='text-sm font-semibold'>Balance</p>
            <p>${account.balance}</p>
          </div>
        ))} 
    </div>
  )
}

export default Overview