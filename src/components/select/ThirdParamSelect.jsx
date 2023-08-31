import React from 'react'

const ThirdParamSelect = ({setSymbolQueryInput, symbolQueryInput}) => {
  return (
    <select 
      className='w-full px-2 py-1 border-2 border-indigo-700 outline-none'
      onChange={(e) => setSymbolQueryInput({...symbolQueryInput, parameter: e.target.value})}
      defaultValue={symbolQueryInput.parameter}>
        <option value={'contains'}>contains</option>
        <option value={'startsWith'}>starts with</option>
        <option value={'endsWith'}>ends with</option>
    </select>
  )
}

export default ThirdParamSelect