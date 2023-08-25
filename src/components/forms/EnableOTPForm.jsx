import React from 'react'
import { useFetchConfigureOTP } from '../../providers/ApiFetch'
import FetchLoading from '../spinners/FetchLoading'


const EnableOTPForm = ({setPin, handleSubmit}) => {

  const {data: data, isLoading, isError, error, isFetching} = useFetchConfigureOTP()

  if(isError){
    console.error(error)
  }

  return (
    <>{isLoading || isFetching ? <FetchLoading /> :
      <form className='flex flex-col text-white w-96' onSubmit={handleSubmit}>
        <h1 className='m-2 text-xl font-bold text-center text-indigo-500'>Stockify</h1>
        <h2 className='mx-2 mb-2 font-bold text-center text-gray-300 text-md'>Set up your two factor authentication</h2>
        <p className='mx-2 mb-4 text-sm text-center text-gray-400'>Please help us secure your account by setting up your two factor authentication before signing in to this account.</p>
        <div className='w-full'>
          <div className='flex flex-row'>
            <div className='flex flex-col items-center justify-start'>
              <p className='steps__indicator'>1</p>
              <hr className='steps__line'/>
            </div>
            <div className='p-1 ml-4'>
              <p className='mb-2 font-bold'>Install an authenticator app </p>
              <p className='mb-2 text-xs font-bold'>Recommended:</p>
              <div className='text-xs'>
                <p>Google Authenticator - iOS | Android</p>
                <p>Microsoft Authenticator - iOS | Android</p>
              </div>
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='flex flex-col items-center justify-start'>
              <p className='steps__indicator'>2</p>
              <hr className='steps__line'/>
            </div>
            <div className='p-1 ml-4'>
              <p className='mb-2 font-bold'>Add account</p>
              <div className='text-xs'>
                <p>Scan the QR code or manually enter the following in your Authenticator.</p>
                <div className='my-2 mb-4'>
                  <p><b>Name:</b> Stockify</p>
                  <p><b>Key: {data && data.key}</b></p>
                </div>
                <div className='p-4 bg-white w-36'>
                  <img src={`data:image/svg+xml;base64,${data && data.qrcode}`} alt="" width='120' height='120'/>
                </div>
                  
              </div>
            </div>
          </div>
          
          <div className='flex flex-row'>
            <div className='flex flex-col items-center justify-start'>
              <p className='steps__indicator'>3</p>
            </div>
            <div className='p-1 ml-4'>
              <p className='mb-2 font-bold'>Enter 6 digit verification code</p>
              <input 
                type="text" 
                name="otp"
                className='w-full p-2 mt-1 text-black border border-gray-500 rounded-sm outline-indigo-700'
                onChange={(e) => setPin(e.target.value)}
                />
              <p className='mt-1 text-xs text-gray-500'>Provided by your authenticator (numbers only)</p>
              <button type='submit' className='w-full p-2 mt-4 text-white bg-indigo-900 shadow-xl'>Verify</button>
            </div>
          </div>
          
        </div>
  
    
      </form>
      }
    </>
  )
}

export default EnableOTPForm