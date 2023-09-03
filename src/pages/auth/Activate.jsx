import React, { useContext, useEffect, useState } from 'react'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DataContext } from '../../providers/DataContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import FetchLoading from '../../components/spinners/FetchLoading';
import fetchActivate from '../../services/fetchActivate';

const Activate = () => {
  
  const { dispatch, signOut} = useContext(DataContext)
  const [redirecting, setRedirecting] = useState(false)
  const navigate =  useNavigate()

  const location = useLocation();
  const auth = new URLSearchParams(location.search).get('token');

  useEffect(() => {

    if(auth) {
      const activate = async() => {
        const response = await fetchActivate(auth)
        if(response.message){
          console.log(response.message)
        }
      }
      activate();
    }
  }, [auth])

  const handleReturn = () => {
    navigate('/login')
  }
  
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen text-white bg-gray-900'>
        <div className='py-8 text-center'>
          <p className='m-2'><HowToRegIcon style={{fontSize: '5rem'}}/></p>
          <h1 className='mt-2 mb-4 text-2xl font-bold'>Account Activated.</h1>
          <div className='text-sm w-96'>
            <p>Thank you for choosing Stockify. We are happy to be a part of your next financial success story.</p>
          </div>
          <hr className='w-full mt-4 bg-white'/>
        </div>
       
        <div className='px-4 w-96'>
          <div>
            <h2 className='font-bold'> What's next?</h2>
            <ol className='pl-4 mt-2 mb-6 text-sm underline list-disc hover:cursor-pointer'>
              <li>Learn more about our terms of service and conditions.</li>
            </ol>
          </div>
          <div>
            <h2 className='font-bold'> Getting started.</h2>
            <ol className='pl-4 mt-2 mb-6 text-sm underline list-disc hover:cursor-pointer'>
              <li>Guides</li>
              <li>Investment Basics</li>
              <li>Market Analysis</li>
              <li>Risk Management</li>
              <li>FAQs and Help Center</li>
            </ol>
          </div>
          <div className='flex items-center justify-end w-full'>
            <button onClick={handleReturn} className='p-2 bg-indigo-500 rounded-sm'>Return to login</button>
          </div>
        </div>
      </div>
     
  )
}

export default Activate