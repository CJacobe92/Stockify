import React, { useContext, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import BuyTransaction from '../fieldsets/BuyTransaction'
import StockSearch from '../fieldsets/StockSearch'
import StockDetails from '../fieldsets/StockDetails'

const Stock = () => {
  const [selected, setSelected] = useState(null)
  
  return (
    <div>
      <p className='pb-2 text-lg font-semibold bg-gray-900'>Stock</p>
      <div className='p-2 bg-white'>
        <StockSearch setSelected={setSelected}/>
        <StockDetails selected={selected}/>
        <BuyTransaction selected={selected}/>
      </div>
    </div>
    
  )
}

export default Stock