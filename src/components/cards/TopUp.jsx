import React, { Component, useContext, useEffect, useState } from 'react'
import topup from '../../assets/topup.jpg'
import fetchUpdateAccount from '../../services/fetchUpdateAccount'
import { DataContext } from '../../providers/DataContextProvider'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanToolIcon from '@mui/icons-material/PanTool';
import { useQueryClient } from '@tanstack/react-query';
import ComponentLoading from '../spinners/ComponentLoading';

const TopUp = () => {

  const { userData } = useContext(DataContext)
  const queryClient = useQueryClient();
  
  const user = userData?.data      
  const accounts = user?.accounts.reduce((account) => account)
  const account_number = accounts?.account_number
  const account_balance = accounts?.balance
  const account_id = accounts?.id

  const [formData, setFormData] = useState({balance: ''})
  const [error, setError] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const {mutate, isLoading, isFetching} = fetchUpdateAccount();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
    setIsTyping(true)
  }

  const handleSubmit = async() => {
    if(isTyping){
      mutate({formData, account_id}, {
        onError: (error) => {
          setError(true)
          setMessage(error)
        },
        onSuccess: (data) => {
          setError(false)
          setIsTyping(false)
          setFormData({...formData, balance: ''})
          queryClient.invalidateQueries('userData')
          return data
        }
      })
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
        <div className='mx-2 mt-4 mb-2 text-sm'>
          <p className='text-lg font-semibold'>Add funds to your wallet.</p>
          <div className='flex flex-row mt-2 text-sn'>
            <p className='w-24 font-semibold'>Account#:</p>
            <p>{account_number}</p>
          </div>
          <div className='flex flex-row text-sm'>
            <p className='w-24 font-semibold'>Balance:</p>
            <p>&#8369;{account_balance}</p>
          </div>
          <div className='flex flex-row justify-end w-full h-4 mx-2 text-sm'>
            {isLoading && isFetching ? <div className='text-sm font-semibold'>Processing...</div> : renderStatus()}
          </div>
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
            Note: Please allow atleast 5 minutes for the amount to reflect on your wallet.
          </p>
        </div>  
       
      </fieldset>
    </div>
  )
}

export default TopUp