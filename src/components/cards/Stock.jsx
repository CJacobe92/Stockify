import React, { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import BuyTransaction from '../fieldsets/BuyTransaction'
import StockSearch from '../fieldsets/StockSearch'
import StockDetails from '../fieldsets/StockDetails'

const Stock = () => {

  const {state} = useContext(GlobalContext)
  const selected = state && state.selected
  
  return (
    <div>
      <p className='mb-2 bg-gray-900'>Stock</p>
      <div className='p-2 bg-white'>
        <StockSearch />
        <StockDetails selected={selected}/>
        <BuyTransaction />
      </div>
    </div>
    
  )
}

export default Stock