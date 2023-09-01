import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'

const BuyingPower = () => {

  const { state } = useContext(DataContext)
  const [buyingPower, setBuyingPower] = useState()
  const accounts = state.data && state.data.accounts && state.data.accounts
  const accountBalance = accounts && accounts.map((account) => (account.balance))

  useEffect(() => {
    if(accounts){
      setBuyingPower(parseFloat(accountBalance))
    } 
    
  }, [accounts])
  return (
      <fieldset className='px-2 py-4 bg-white border-2 border-indigo-700 rounded-sm'>
        <legend className='ml-2 text-xs font-semibold text-indigo-700'>Buying Power</legend>
        <p className='text-4xl font-semibold text-indigo-900'>$ {buyingPower ? buyingPower.toFixed(2) : null}</p>
      </fieldset>          
    )

}

export default BuyingPower