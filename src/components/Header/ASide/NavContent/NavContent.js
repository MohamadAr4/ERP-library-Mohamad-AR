import React from 'react';
import NavItem from "./NavItem/NavItem";

const NavContent = props => {
  return(
    <li key={props.key} class="nav-item">
      <a class="nav-link d-flex align-items-center justify-content-between collapsed" data-bs-target={`#PhsProg-${props.menuItem.id}`} data-bs-toggle="collapse" href="#">
        <span>
          <i class={props.menuItem.icon}></i>
          <span class="PhLabel" data-label={props.menuItem.label}>
            {props.menuItem.name}
          </span>
        </span>
        <i class="bi bi-chevron-down"></i>
      </a>
      <ul id={`PhsProg-${props.menuItem.id}`} class="nav-content collapse" data-bs-parent={props.parent}>
        {props.menuItem.aList.map((subItem, subIndex) => (
              <NavItem key={subIndex} menuItem={subItem}/>
                ))}
      </ul>
    </li>
    );
};

export default NavContent;
