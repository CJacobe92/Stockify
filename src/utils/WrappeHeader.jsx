import React, { useState } from 'react';
import AdminNavbar from '../components/cta/AdminNavbar';

const WrappedHeader = (Component, title) => {

  const NewComponent = () => (

    <>
    <div className='flex flex-col w-full'>
      <AdminNavbar title={title}/>
      <Component />
     </div>
    </>
  );

  return NewComponent;
};

export default WrappedHeader;