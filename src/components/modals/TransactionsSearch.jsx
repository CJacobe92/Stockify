import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const TransactionsSearchModal = ({ children, setInput, input}) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        <div className='flex flex-row justify-center p-2 item-center'>
          <ManageSearchIcon style={{ fontSize: '1.8rem' }} />
        </div>
      </button>
      {open && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30'
          onClick={()=>{closeModal(), setInput({...input, account_number: ''})}}
        >
          <div className='relative z-50 h-auto p-4 w-[60%]' onClick={stopPropagation}>
            <div className='flex flex-row justify-between'>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionsSearchModal;
