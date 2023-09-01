import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'

const AccountValue = () => {

  const { state } = useContext(DataContext)
  const [totalValue, setTotalValue] = useState()
  const accounts = state.data && state.data.accounts && state.data.accounts
  const account = accounts && accounts.reduce((account) => (account.balance))
  const portfolios = accounts && accounts[0].portfolios
  

  useEffect(() => {
    let sum = 0
    
    if (portfolios !== undefined) {
        portfolios && portfolios.forEach((portfolio) => {
          sum += parseFloat(portfolio.total_value);
          let balance = parseFloat(account.balance)
          let total = balance + sum
          setTotalValue(parseFloat(total))
      })
    }else{
      setTotalValue(parseFloat(accounts.balance))
    }
  }, [accounts, portfolios])
 
  return (

      <fieldset className='px-2 py-4 mb-4 bg-white border-2 border-indigo-700 rounded-sm'>
        <legend className='text-sm font-semibold text-indigo-700'>Total Account Value</legend>
        <p className='text-3xl font-bold text-indigo-900'>$ {totalValue ? totalValue.toFixed(2) : null}</p>
      </fieldset>          
  )
}

export default AccountValue