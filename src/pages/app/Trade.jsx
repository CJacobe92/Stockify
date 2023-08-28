import React, { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'

const Trade = () => {
 const {state} = useContext(GlobalContext)
 const selected = state && state.selected
 
  return (
    <section className='flex flex-row items-start justify-start w-full p-20'>

      <div className='w-full p-2 m-2 bg-gray-200 h-96'>
      
      </div>
     
      
      
      
       
    </section>
   
  )
}

export default Trade