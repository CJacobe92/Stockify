import React from 'react'

const FourthParamSelect = ({setQuantityQueryInput, quantityQueryInput}) => {
  return (
    <select 
      className='w-full px-2 py-1 border-2 border-indigo-700 outline-none'
      onChange={(e) => setQuantityQueryInput({...quantityQueryInput, parameter: e.target.value})}
      defaultValue={quantityQueryInput.parameter}>
        <option value={'equalTo'}>equal to</option>
        <option value={'greaterThan'}>greater than</option>
        <option value={'lessThan'}>less than</option>
    </select>
  )
}

export default FourthParamSelect