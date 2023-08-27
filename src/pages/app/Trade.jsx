import React, { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import StockList from '../../components/cards/Transaction'
import StockSearch from '../../components/search/StockSearch'
import StockDetails from '../../components/cards/StockDetails'
import Transaction from '../../components/cards/Transaction'

const Trade = () => {
 const {state} = useContext(GlobalContext)
 const selected = state && state.selected
 
  return (
    <section className='flex flex-row items-start justify-start w-full p-20'>

      <div className='w-full p-2 m-2 bg-gray-200 h-96'>
        <StockSearch />
        <StockDetails/>
        <Transaction />
      </div>
     
      
      
      
       
    </section>
   
  )
}

export default Trade