import React, { useState } from 'react'
import FirstParamSelect from '../select/FirstParamSelect'
import SecondParamSelect from '../select/SecondParamSelect'
import ThirdParamSelect from '../select/ThirdParamSelect'
import FourthParamSelect from '../select/FourthParamSelect'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';


const AdvancedQuery = ({setQuery, query}) => {

  const [idQueryInput, setIdQueryInput] = useState({parameter: 'contains', value: ''})
  const [typeQueryInput, setTypeQueryInput] = useState({parameter: 'contains', value: ''})
  const [symbolQueryInput, setSymbolQueryInput] = useState({parameter: 'contains', value: ''})
  const [quantityQueryInput, setQuantityQueryInput] = useState({parameter: 'equalTo', value: ''})

  const handleQuery = () => {
    setQuery(
      {...query, 
        id: idQueryInput, 
        type: typeQueryInput, 
        symbol: symbolQueryInput,
        quantity: quantityQueryInput
      })
  }
  
  const handleReset = () => {
    setQuery({
      id: {parameter: 'contains', value: ''},
      type: {parameter: 'contains', value: ''},
      symbol: {parameter: '', value: ''},
      quantity: {parameter: 'contains', value: ''}})
  }
  
  return (
    <div className='w-full p-2 bg-white'>
      <fieldset className='w-full p-2 border-2 border-indigo-500'>
        <legend className='text-indigo-700'>Advanced Query</legend>
        <table className='w-full text-indigo-700'>
          <thead className='w-full'>
            <tr>
              <th className='p-2'>Key</th>
              <th className='p-2'>Parameter</th>
              <th className='p-2'>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2'>Id</td>
              <td className='p-2'><FirstParamSelect setIdQueryInput={setIdQueryInput} idQueryInput={idQueryInput}/></td>
              <td className='p-2'>
                <input 
                  onChange={(e) => setIdQueryInput({...idQueryInput, value: e.target.value})}
                  value={idQueryInput.value}
                  type="text" 
                  id='idValue' 
                  className='w-full px-2 py-1 border-b-2 border-indigo-700 outline-none'/>
              </td>
            </tr>
            <tr>
              <td className='p-2'>Type</td>
              <td className='p-2'><SecondParamSelect setTypeQueryInput={setTypeQueryInput} typeQueryInput={typeQueryInput}/></td>
              <td className='p-2'>
              <input 
                  onChange={(e) => setTypeQueryInput({...typeQueryInput, value: e.target.value})}
                  type="text" 
                  id='typeValue' 
                  className='w-full px-2 py-1 border-b-2 border-indigo-700 outline-none'/>
              </td>
            </tr>
            <tr>
              <td className='p-2'>Symbol</td>
              <td className='p-2'><ThirdParamSelect setSymbolQueryInput={setSymbolQueryInput} symbolQueryInput={symbolQueryInput}/></td>
              <td className='p-2'>
              <input 
                  onChange={(e) => setSymbolQueryInput({...symbolQueryInput, value: e.target.value})}
                  type="text" 
                  id='symbolValue' 
                  className='w-full px-2 py-1 border-b-2 border-indigo-700 outline-none'/>
              </td>
            </tr>
            <tr>
              <td className='p-2'>Quantity</td>
              <td className='p-2'><FourthParamSelect setQuantityQueryInput={setQuantityQueryInput} quantityQueryInput={quantityQueryInput}/></td>
              <td className='p-2'>
              <input 
                  onChange={(e) => setQuantityQueryInput({...quantityQueryInput, value: e.target.value})}
                  type="text" 
                  id='quantityValue' 
                  className='w-full px-2 py-1 border-b-2 border-indigo-700 outline-none'/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='flex flex-row justify-between mx-2 mt-2'>
          <button onClick={handleQuery} className='w-full p-2 text-white bg-indigo-700'>Query</button>
          <button onClick={handleReset} className='p-1 ml-2 bg-indigo-700'><RotateLeftIcon style={{fontSize: '2rem'}}/></button>
        </div>
        
      </fieldset>
    </div>
  )
}

export default AdvancedQuery