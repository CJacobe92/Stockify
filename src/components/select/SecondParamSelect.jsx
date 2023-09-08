import React from 'react'

const SecondParamSelect = ({setTypeQueryInput, typeQueryInput}) => {
  return (
    <select 
      className='w-full px-2 py-1 border-2 border-indigo-700 outline-none'
      onChange={(e) => setTypeQueryInput({...typeQueryInput, parameter: e.target.value})}
      defaultValue={typeQueryInput.parameter}>
        <option value={'contains'}>contains</option>
        <option value={'startsWith'}>starts with</option>
        <option value={'endsWith'}>ends with</option>
    </select>
  )
}

export default SecondParamSelect