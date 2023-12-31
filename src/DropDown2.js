import React, { useRef, useEffect } from 'react';

const DropDown = ({ array, name, selected,selection, setSelected, click, setClick, closeOthers,dis,func }) => {
  const dropRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setClick(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setClick]);

  const handleButtonClick = (e) => {
    e.stopPropagation();
  
    setClick((prev) => !prev);
    if(click===false){
    closeOthers();}
  };

  return (
    <div className="drop-down" ref={dropRef}>
      <button className="butt made" id={`${name}button`} onClick={handleButtonClick} disabled={selection}  >
        {name}
        <span>&#9660;</span>
      </button>
      {click && (
        <div className="drop-down-menu active" >
          {array.map((item, index) => (
            <div key={index} onClick={() => {
              setSelected(item);
              setClick(false);
              
              if((item!=="A* search" )&& (item!=="Greedy Best First Search")){
                func()
              }
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
