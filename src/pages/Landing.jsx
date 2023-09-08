import React from 'react'
import { Link } from 'react-router-dom'
import home1 from '../assets/home1.png'
import home2 from '../assets/home2.png'
import home3 from '../assets/home3.svg'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Landing = () => {
  return (
    <div className='flex flex-col w-full min-h-screen overflow-y-auto bg-gray-900'>
      <div className='flex flex-row justify-between w-full py-10 px-20 h-[10vh] items-center border-b-2 border-indigo-700'>
        <div className='flex flex-row items-center'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold text-center text-indigo-500'>Stockify</h1>
            <p className='m-1 text-xs font-semibold text-indigo-200'>"Trade. Thrive. Triumph."</p>
          </div>
          <div className='flex flex-row items-center ml-12'>
            <Link className='m-2 font-semibold text-white hover:text-indigo-500'>Trade</Link>
            <Link className='m-2 font-semibold text-white hover:text-indigo-500'>About</Link>
            <Link className='m-2 font-semibold text-white hover:text-indigo-500'>Support</Link>
          </div>
        </div>
        <div>
          <Link to={'/login'} className='px-6 py-2 m-2 font-semibold text-white bg-indigo-700 rounded-sm'>Login</Link>
          <Link to={'/register'} className='m-2 font-semibold text-indigo-300'>Register</Link>
        </div>
      </div>
      
      <div className='grid items-center grid-cols-2 gap-4 p-20'>
        <div className='col-span-1 text-white'>
          <h1 className='text-5xl font-semibold text-indigo-200'>Welcome to Stockify – Your Ultimate Trading Destination!</h1>
          <div className='flex flex-col my-6'>
            <div className='flex flex-col w-full'>
              <h1 className='my-4 text-3xl font-bold text-indigo-500'>The Future of Trading</h1> 
              <p className='prose'>
                At Stockify, we're redefining the trading experience. Our cutting-edge platform combines state-of-the-art technology with expert insights to bring you a 
                trading ecosystemdivke no other. Whether you're new to trading or a seasoned pro, 
                Stockify equips you with the tools and knowledge to thrive in today's dynamic markets.
              </p>
            </div>
            
          </div>
        </div>
        <img src={home1} className='object-contain col-span-1' loading="lazy"/>
      </div>
            
      <div className='grid items-center grid-cols-2 gap-4 px-20 bg-gray-800'>
        <div>
          <img src={home2} className='object-contain col-span-1 h-96' loading="lazy"/>
        </div>
        
        <div className='flex flex-col col-span-1 my-6 text-white'>
          <h1 className='my-4 text-3xl font-bold text-indigo-500'>Success is Our Priority</h1>
          <p>We understand that in the world of trading, success is the
            ultimate goal. That's why Stockify is built on a foundation of trust, innovation, and unwavering support. 
            Our mission is to help you triumph over market challenges and reach new heights of financial success. 
            Join us on this journey, where every trade is an opportunity, every insight is a game-changer, and every triumph is celebrated. 
            Trade with confidence, thrive with Stockify."</p>
        </div>
      </div>

      <div className='flex flex-col px-20 py-10 text-center bg-indigo-1000'>
        <h1 className='mb-4 text-5xl font-bold text-indigo-500'>Stockify</h1> 
        <h2 className='mt-4 text-2xl font-semibold text-white'>Where Trading Dreams Soar, Knowledge Empowers, and Success Finds Its Home.</h2>
        <h3 className='mt-4 text-xl font-semibold text-indigo-200'>"Your Journey to Financial Triumph Begins Here."</h3>
        <img src={home3} className='object-contain col-span-1 mt-6 h-96' loading="lazy"/>
      </div>
      <div className='grid items-center justify-center grid-cols-3 gap-4 px-20 py-2 text-xs bg-gray-700'>
        <div className='flex flex-col items-center justify-center col-span-1'>
          <ol>
            <li className='my-1 text-sm font-semibold text-indigo-200'>Customer Service</li>
            <li className='text-white'>Help Centre</li>
            <li className='text-white'>Stockify Cares</li>
            <li className='text-white'>Payment Methods</li>
            <li className='text-white'>Order Tracking</li>
            <li className='text-white'>Contact Us</li>
          </ol>
        </div>

        <div className='flex flex-col items-center justify-center col-span-1'>
          <ol>
            <li className='my-1 text-sm font-semibold text-indigo-200'>About Stockify</li>
            <li className='text-white'>About Us</li>
            <li className='text-white'>Stockify Careers</li>
            <li className='text-white'>Stockify Blog</li>
            <li className='text-white'>Privacy Policy</li>
            <li className='text-white'>Terms Of Service</li>
          </ol>
        </div>
        <div className='flex flex-col items-center justify-center col-span-1'>
          <ol>
            <li className='my-1 text-sm font-semibold text-indigo-200'>Follow Us</li>
            <li className='flex flex-row items-center text-white'>
              <FacebookIcon className='mr-1'/>
              Facebook
            </li>
            <li className='flex flex-row items-center text-white'>
              <InstagramIcon className='mr-1'/>
              Instagram
            </li>
            <li className='flex flex-row items-center text-white'>
              <TwitterIcon className='mr-1'/>
              Twitter
            </li>
            <li className='flex flex-row items-center text-white'>
              <LinkedInIcon className='mr-1'/>
              LinkedIn
            </li>
          </ol>
        </div>
      </div>
      <div className='flex items-center justify-center px-10 py-6 text-xs text-white'>
        <p>&copy; 2023 Stockify CJacobe. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Landing