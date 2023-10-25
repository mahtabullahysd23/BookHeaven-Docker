import React from 'react';

import './SideModal.style.scss';

const SideModal = ({ isOpen, onClose, children }) => {
  const modalClassName = isOpen ? 'side-modal open' : 'side-modal';

  return (
    <div className={isOpen?`modal-overlay`:''}>
        <div className={modalClassName}>
      <div className="side-modal-content">
        <button className="side-modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>    
    </div>  
  );
};

export default SideModal;
