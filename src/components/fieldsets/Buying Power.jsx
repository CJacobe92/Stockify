import React, { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'

const BuyingPower = () => {

  const { state } = useContext(GlobalContext)
  const accounts = state.accounts

  return (
    accounts && accounts.map((account, index) => (
      <fieldset className='px-2 py-4 bg-white border-2 border-indigo-700 rounded-sm' key={index}>
        <legend className='ml-2 text-xs font-semibold text-indigo-700'>Buying Power</legend>
        <p className='text-4xl font-semibold text-indigo-900'>$ {parseFloat(account.balance).toFixed(2)}</p>
      </fieldset>          
    ))
  )
}

export default BuyingPower