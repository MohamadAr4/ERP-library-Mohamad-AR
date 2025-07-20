import React, { useState } from 'react';

const ToggleSide = props => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = (e) => {
    e.preventDefault();
    document.body.classList.toggle("toggle-sidebar");
    setIsSidebarVisible(!isSidebarVisible);
  };

  return(
    <div className="d-flex" onClick={toggleSidebar}>
      <i className="bi bi-list toggle-sidebar-btn"></i>
    </div>
    );
};

export default ToggleSide;
