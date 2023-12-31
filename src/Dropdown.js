import React, { useState, useRef } from 'react';
import './App.css';

const DropDown = ({ array, name, selected, setSelected }) => {
  const [click, setClick] = useState(false);


  window.addEventListener('click', (e) => {
    
      setClick(false);
    
  });

  return (
    <div className="drop-down made" >
      <button
        className="butt"
        onClick={(e) => {
          e.stopPropagation(); 
          setClick((prev) => !prev);
        }}
      >
        {name}
        <span>&#9660;</span>
      </button>
      {click && (
        <div className="drop-down-menu active" >
          {array.map((item, index) => (
            <div key={index} onClick={() => {
              setSelected(item);
              setClick(false);
            }}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
