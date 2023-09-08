import React, { useState } from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const ApprovalModal = ({ children, setInput, input, handleSearch}) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <button onClick={() => {setOpen(!open); handleSearch() }}>
        <div className='flex flex-row justify-center p-2 item-center'>
          <ManageSearchIcon style={{ fontSize: '1.8rem' }} />
        </div>
      </button>
      {open && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30'
          onClick={closeModal}
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

export default ApprovalModal;
