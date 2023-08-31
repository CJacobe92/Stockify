import React, { useState } from 'react'
import Profile from '../../components/cards/Profile'
import Credentials from '../../components/cards/Credentials'
import TopUp from '../../components/cards/TopUp'
import secure from '../../assets/secure.svg'

const Account = () => {

  return (
    <section className='h-[90vh] flex flex-row p-10 justify-between item-start'>
      <div className='w-full m-2 text-white'>
        <img src={secure}
        className='object-cover w-full rounded-r-sm h-44'/>
        <p className='mt-6 text-2xl font-semibold'>KEEP YOUR ACCOUNT SECURE</p>
        <ol className='mt-2'>
          <li className='mt-2'><b className='text-indigo-300'>Be Careful with Personal Information:</b> Avoid sharing personal or financial information through email, social media, or unfamiliar websites. Always use secure and trusted platforms for such communications.</li>
          <li className='mt-2'><b className='text-indigo-300'>Use Strong Passwords:</b> Create passwords that are a mix of uppercase and lowercase letters, numbers, and special characters. Avoid using easily guessable information like birthdays, names, or common words.</li>
          <li className='mt-2'><b className='text-indigo-300'>Beware of Phishing:</b> Be cautious of emails, messages, or links that ask for personal information or account details. Always verify the sender's identity before providing any sensitive information.</li>
        </ol>
      </div>
      <div className='mx-4 w-96'>
        <Profile />
        <Credentials />
      </div>
      <div className='mx-4 w-96'>
        <TopUp />
      </div>
     
    </section>
  )
}

export default Account