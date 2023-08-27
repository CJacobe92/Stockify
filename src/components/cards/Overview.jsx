import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'

const Overview = () => {

  const { state } = useContext(GlobalContext)
  const accounts = state.accounts
 
  return (
    <div className='w-40 p-2 m-2 bg-white'>
      <fieldset className='border border-black'>

     
      <legend className='mx-2 text-black'>Overview</legend>
      {accounts && accounts.map((account, index) => (
        <div className='p-2 text-black' key={index}>
          <p className='text-sm font-semibold'>Balance</p>
          <p>${account.balance}</p>
        </div>
      ))}
       </fieldset>
    </div>
  )
}

export default Overview