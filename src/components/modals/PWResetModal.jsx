import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

const PWResetModal = ({ children, title }) => {
  
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(!open)} className='w-full font-semibold text-indigo-700'>
        Reset Password
      </div>
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30'>
          <div className='relative z-50 h-auto p-2 bg-white rounded-lg w-96'>
            <div className='flex flex-row justify-between'>
              <p className='text-sm font-semibold text-indigo-700'>{title}</p>
              <button onClick={() => setOpen(!open)} className='text-xs text-indigo-900 '><CancelIcon /></button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default PWResetModal;
