import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import BackDrop from '../backdrop/BackDrop';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    let hamIcon = document.getElementById('hamIcon')! as HTMLElement;
    if (sidebar) {
      hamIcon.style.display = 'none';
    } else {
      hamIcon.style.display = 'block';
    }
  }, [sidebar]);

  return (
    <div>
      {sidebar && <BackDrop onClick={()=>{setSidebar(!sidebar)}}/>}
      <span id="hamIcon" onClick={showSidebar}>
        <GiHamburgerMenu />
      </span>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <div className="closeIcon">
            <AiFillCloseCircle onClick={showSidebar} />
          </div>
          <div className="nav-text-container">
            {SidebarData.map((item, index) => {
              return (
                <div key={index} className={item.cName}>
                  <NavLink to={item.path} >
                    {item.icon}
                    <span className="spacing">{item.title}</span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
