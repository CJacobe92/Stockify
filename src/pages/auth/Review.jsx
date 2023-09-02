import React, { useContext } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Navigate, useNavigate } from 'react-router-dom';
import { DataContext } from '../../providers/DataContextProvider';
import useAuth from '../../hooks/useAuth';
import Login from './Login';

const Review = () => {

  const { signOut } = useContext(DataContext)
  const isAuthenticated = useAuth();
  
  const handleReturn = () => {
      signOut();
  }
  
  return isAuthenticated ? (
    <div className='flex flex-col items-center justify-center w-full min-h-screen text-white bg-gray-900'>
        <div className='py-8 text-center'>
          <p className='m-2'><PendingActionsIcon style={{fontSize: '3rem'}}/></p>
          <h1 className='mt-2 mb-4 text-2xl font-bold'>Application Under Review.</h1>
          <div className='text-sm font-semibold'>
            <p>We have received your application and in the process of reviewing it.</p>
            <p>An activation email will be sent to you once approved.</p>
          </div>
          <hr className='w-full mt-4 bg-white'/>
        </div>
       
        <div className='px-4 w-96'>
          <ol className='list-disc'>
            <li className='mt-2 mb-4'>
              <p className='m-1 text-lg font-bold'>What's next?</p>
              <div className='m-2 text-sm'>
                <p> Please check your junk or spam folder for an email coming from cjacobedev92mailer@gmail.com,</p>
                <p>with a title of <b>"More information needed"</b>.</p>
                <br />
                <p>This means that further details is needed regarding your application.</p>
              </div>
            </li>
           
            <li className='mt-2 mb-4'>
              <p className='m-1 text-lg font-bold'>Why my application is being reviewed?</p>
              <div className='m-2 text-sm'>
                <p>We review your application to ensure adherence to our terms of service and conditions.</p>
              </div>
            </li>

            <li className='mt-2 mb-4'>
              <p className='m-1 text-lg font-bold'>How long is the application process?</p>
              <div className='m-2 text-sm'>
                <p>If there are no issues with your application, the normal processing time is 3 business days from the date of submission.
                </p>
              </div>
            </li>
          </ol>
          <div className='w-full text-right'>
              <button className='p-2 bg-indigo-900 rounded-md' onClick={handleReturn} >Return</button>
          </div>
        </div>
      </div> 
  ) : <Navigate to='/login' />
}

export default Review