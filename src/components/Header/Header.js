import React from 'react';
import ASide from "./ASide/ASide";
import ToggleSidebar from "./ASide/ToggleSide/ToggleSide";
import ToggleSettings from "./ToggleSettings/ToggleSettings";
import ToggleTheme from "./ToggleTheme/ToggleTheme";
import ToggleDirection from "./ToggleDirection/ToggleDirection";
import UserMenu from "./UserMenu/UserMenu";

const Header = props => {

  const toggleSidebar = (e) => {
    e.preventDefault();
    document.body.classList.toggle("toggle-sidebar");
  };

  return (
    <>
    <header
      id="header"
      class="header fixed-top d-flex align-items-center justify-content-between d-print-none"
      >
      <div class="d-flex align-items-center justify-content-between">

        <ToggleSidebar onClick={toggleSidebar}/>

        <div class="d-none d-sm-block d-flex align-items-center justify-content-center justify-content-sm-start px-3">
          <h5 class="d-none d-sm-block"></h5>
        </div>

        <div class="search-bar d-none">
          <form class="search-form d-flex align-items-center" method="POST" action="#">
            <input
              class="form-control"
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
              />
            <button type="submit" title="Search">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>

      <nav class="header-nav text-end">
        <ul class="d-flex align-items-center">
          <li class="nav-item">
          <ToggleDirection id="dir-rtl" dir="rtl" title="Right to Left"/>
          </li>

          <li class="nav-item">
          <ToggleTheme id="theme-dark" title="Toggle Theme"/>
          </li>

          <li class="nav-item">
          <ToggleSettings id="setting-bar" target="#settingsBar" aria-controls="settingsBar" title="Settings"/>
          </li>

          <li class="nav-item dropdown bg-light-subtle">
          <UserMenu userMenu={props.userMenu} />
          </li>
        </ul>
      </nav>
    </header>
    <ASide key="sidebar" phsMenu={props.phsMenu}>

    </ASide>
    </>
    );
};
export default Header;
