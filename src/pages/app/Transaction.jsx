import React, { useEffect, useState } from 'react'
import TransactionHistory from '../../components/cards/TransactionHistory'
import TransactionSearch from '../../components/fieldsets/TransactionSearch'
import AdvancedQuery from '../../components/fieldsets/AdvancedQuery'

const Transaction = () => {
  
  const [input, setInput] = useState({
    query: '',
    filter: 'symbol',
    parameter: 'contains',
  })

  
  const [query, setQuery] = useState({
    id: {parameter: 'contains', value: ''},
    type: {parameter: 'contains', value: ''},
    symbol: {parameter: '', value: ''},
    quantity: {parameter: 'contains', value: ''}
  })

  const [debouncedInput, setDebouncedInput] = useState(input)
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setDebouncedInput({...debouncedInput, [name]: value})
  }
  
  useEffect(() => {
    const timer = setTimeout(() => setInput(debouncedInput), 500);
    return () => clearTimeout(timer);
  }, [debouncedInput])

  return (
    <section className='grid w-full h-[90vh] grid-cols-6 gap-4 p-20'>
      <div className='col-span-2'>
        <TransactionSearch 
          input={input}
          handleChange={handleChange}
          />
      </div>
      <div className='w-full col-span-4 row-span-4'>
        <TransactionHistory 
        input={input}
        query={query}/>
      </div>
      <div className='col-span-2'>
        <AdvancedQuery setQuery={setQuery} query={query}/>
      </div>
      
    </section>
   
  )
}

export default Transaction