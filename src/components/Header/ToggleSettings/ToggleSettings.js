import React from 'react';

const ToggleSettings = props => {
  return(
    <a class="nav-link nav-icon" href="#">
      <i
        id={props.id}
        class="bi bi-gear"
        target={props.target}
        aria-controls="settingsBar"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-animation="true"
        data-bs-custom-class="tooltip-primary-bg"
        data-bs-title={props.title}
        title={props.title}
        ></i>
    </a>
    );
};

export default ToggleSettings;
