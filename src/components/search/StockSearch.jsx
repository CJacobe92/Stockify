import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'

const StockSearch = () => {

  const [input, setInput] = useState('')
  const [debouncedInput, setDebouncedInput] = useState(input)
  const { state, dispatch } = useContext(GlobalContext)
  const selected = state && state.selected
  const stockData = state.stock_data && state.stock_data.data

  const onSelect = (id, symbol, name, percent_change, price, volume) => {
    dispatch({type: 'SET_SELECTED', selected: {id: id, symbol: symbol, name: name, percent_change: percent_change, price: price, volume: volume }})
    setInput('')
  }

  useEffect(() => {
    const timer = setTimeout(() => setInput(debouncedInput), 100);
    return () => clearTimeout(timer);
}, [debouncedInput])

  return (
    <div className='p-2 bg-white'>
      <fieldset className='relative p-2 text-black border border-black rounded-sm'>
        <legend className='text-sm font-semibold'>Stock Search</legend>
        <div className=''>
            <input type="text" name="" id="" onChange={(e) => setDebouncedInput(e.target.value)} className= "w-full border border-indigo-500 rounded-sm outline-none "/>
        </div>
        <div className='absolute w-full shadow-md'>
          {stockData && stockData.filter((stock) => {
            const query = input;
            const symbol = stock.symbol
            const name = stock.name
            return(query && symbol.includes(query) || query && name.includes(query))
          }).slice(0, 5).map((stock) => 
            stock.stock_prices.map((sp, index) => (
              <div key={index} className='flex flex-row w-full text-black cursor-pointer bg-slate-200 hover:bg-indigo-900 hover:text-white' onClick={() => onSelect(stock.id, stock.symbol, stock.name, sp.percent_change, sp.price, sp.volume)}>
                <p className='w-10 m-2 text-sm font-semibold'>{stock.symbol}</p>
                <p className='my-2 ml-10 text-sm'>{stock && stock.name.slice(0, 30)}</p>
              </div>)
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default StockSearch