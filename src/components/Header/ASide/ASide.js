import React from 'react';
import NavContent from "./NavContent/NavContent";
import NavItem from "./NavContent/NavItem/NavItem";

const ASide = props => {

  const toggleSidebar = (e) => {
    e.preventDefault();
    if (!document.body.classList.contains(("toggle-sidebar"))) {
      document.body.classList.toggle("toggle-sidebar");
    }
  };

  return(
    <>
    <aside id={props.key} className="sidebar d-print-none">
      <ul className="sidebar-nav" id="sidebar-nav">
        {props.phsMenu.map((menuItem, index) =>
              menuItem.aList.length > 0 ? (
              <NavContent key={index} parent="#sidebar-nav" menuItem={menuItem}/>
                ) : (
              <NavItem key={index} menuItem={menuItem}/>
                )
            )
        }
      </ul>
    </aside>
    {/* <div className="sidebar-backdrop d-print-none" onClick={toggleSidebar}></div> */}
    </>
    );
};

export default ASide;
