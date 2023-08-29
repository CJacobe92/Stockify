import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'

const AccountValue = () => {

  const { state } = useContext(GlobalContext)
  const [totalValue, setTotalValue] = useState()
  const accounts = state.accounts && state.accounts
  const portfolios = state.portfolios && state.portfolios
  
  console.log(state.data)
  useEffect(() => {
    if (portfolios) {
      let sum = 0
      portfolios.forEach((portfolio) => {
        if(portfolio != undefined){
          sum += parseFloat(portfolio.total_value);
          setTotalValue(sum)
        }else{
          setTotalValue(0)
        }
      });

      
    }
  }, [state.accounts, state.portfolios])


 
  return (
    accounts && accounts.map((account, index) => (
      <fieldset className='px-2 py-4 mb-4 bg-white border-2 border-indigo-700 rounded-sm' key={index}>
        <legend className='ml-2 text-sm font-semibold text-indigo-700'>Total Account Value</legend>
        <p className='text-5xl font-bold text-indigo-900'>$ {account ? parseFloat(account.balance  ) + totalValue : null}</p>
      </fieldset>          
    ))
  )
}

export default AccountValue