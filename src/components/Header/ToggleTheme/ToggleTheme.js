import React from 'react';

const ToggleTheme = props => {
  return(
    <a class="nav-link nav-icon" href="#">
      <i
        id={props.id}
        class="theme-toggle bi bi-record-fill"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-custom-class="tooltip-primary-bg"
        data-bs-title={props.title}
        title={props.title}
        >
      </i>
    </a>
    );
};
export default ToggleTheme;
