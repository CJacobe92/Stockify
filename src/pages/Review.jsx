import React from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import review from '../assets/review.jpg'

const Review = () => {
  return (
    <div className='flex flex-col items-center min-h-screen w-full bg-indigo-900 text-white'>
        <div className='text-center mt-20 mb-10'>
          <p className='m-2'><PendingActionsIcon style={{fontSize: '5rem'}}/></p>
          <h1 className='text-2xl font-bold mt-2 mb-4'>Application Under Review.</h1>
          <div className='text-sm font-semibold'>
            <p>We have received your application and in the process of reviewing it.</p>
            <p>An activation email will be sent to you once approved.</p>
          </div>
          <hr className='bg-white w-full mt-4'/>
        </div>
       
        <div className='w-[30%] px-4'>
          <ol className='list-disc'>
            <li className='mt-2 mb-4'>
              <p className='font-bold m-1 text-lg'>What's next?</p>
              <div className='m-2 text-sm'>
                <p>Watch for an email coming from cjacobedev92mailer@gmail.com.</p>
                <p>We may need more information regarding your application.</p>
              </div>
            </li>
           
            <li className='mt-2 mb-4'>
              <p className='font-bold m-1 text-lg'>Why my application is being reviewed?</p>
              <div className='m-2 text-sm'>
                <p>We review your application to ensure adherence to our terms of service and conditions.</p>
              </div>
            </li>

            <li className='mt-2 mb-4'>
              <p className='font-bold m-1 text-lg'>How long is the application process?</p>
              <div className='m-2 text-sm'>
                <p>"If there are no issues with your application, the normal processing time is 3 business days from the date of submission."
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

    
  )
}

export default Review