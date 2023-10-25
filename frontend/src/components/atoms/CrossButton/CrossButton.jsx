import React from 'react';
import './CrossButton.style.scss';

const CrossButton = ({ onClick }) => {
  return (
    <button className="cross-button" onClick={onClick}>
      <div className="cross-line line-1"></div>
      <div className="cross-line line-2"></div>
    </button>
  );
};

export default CrossButton;
