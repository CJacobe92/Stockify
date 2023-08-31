import React, { useContext, useEffect, useState } from 'react'
import topup from '../../assets/topup.jpg'
import fetchUpdateAccount from '../../services/fetchUpdateAccount'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanToolIcon from '@mui/icons-material/PanTool';

const TopUp = () => {

  const { state } = useContext(GlobalContext)
  const uid = state.uid
  const auth = state.auth
  const account_id = state.data && state.data.accounts[0].id
  console.log(account_id)

  const [formData, setFormData] = useState({balance: ''})
  const [error, setError] = useState(null)
  const [isTyping, setIsTyping] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
    setIsTyping(true)
  }

  const handleSubmit = async() => {
    if(isTyping){
      const response = await fetchUpdateAccount(uid, auth, account_id, formData)
      if(response.ok){
        setError(false)
        setIsTyping(false)
        setFormData({...formData, balance: ''})
      }
    }else if(formData.balance == ''){
      setError(true)
    }
  }
  
  const handleBlur = () => {
    setError(null)
  }
  
  const renderStatus = () => {
    switch(error){
      case true: 
        return(<p className='font-semibold text-red-700'>Invalid action <PanToolIcon/></p>);
      case false:
        return(<p className='font-semibold text-green-700'>Account topup successful <CheckCircleIcon /></p>)
    }
  }
  
  return (
    <div className='p-2 m-2 bg-white w-96' onBlur={handleBlur}>
      <fieldset className='p-2 text-indigo-700 border border-indigo-700'>
        <legend className='font-semibold'>Top Up</legend>
        <img src={topup}
        className='object-cover h-40 rounded-r-sm w-96'/>
        <div className='flex flex-row h-4 mx-2 mt-4 text-sm'>
          {renderStatus()}
        </div>
        <div className='mx-2 mt-6 mb-2 text-sm'>
          <p className='font-semibold'>Add funds to your wallet.</p>
        </div>
        <div className='flex flex-col mx-2 mt-4'>
          <label className='mb-2 text-xs font-semibold'>Amount</label>
          <input onChange={handleChange} value={formData.balance} type="text" name="balance" className='p-2 bg-indigo-100 border border-indigo-700 outline-none'/>
        </div>

        <div className='mx-2 mt-4'>
          <button onClick={handleSubmit} className='w-full p-2 text-white bg-indigo-900'>Top Up</button>
        </div>
        <div className='mx-2 mt-4'>
          <p className='text-xs'>
            Note: Please allow 5 minutes for the amount to reflect on your wallet.
          </p>
        </div>  
       
      </fieldset>
    </div>
  )
}

export default TopUp