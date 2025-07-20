import React from 'react';

const NavItem = props => {
  return(
    <li key={props.key} class="nav-item">
      <a class="nav-link " href={`/${props.menuItem.url}`}>
        <i class={props.menuItem.icon}></i>
        <span class="PhLabel" data-label={props.menuItem.name}>
          {props.menuItem.name}
        </span>
      </a>
    </li>
    );
};

export default NavItem;
