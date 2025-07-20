import React from 'react';

const ToggleDirection = props => {
  return(
    <a class="nav-link nav-icon" href="#">
      <i
        id={props.id}
        class="dir-toggle bi bi-caret-{props.dir} d-none"
        title={props.title}
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title={props.title}
        data-bs-custom-class="tooltip-primary-bg"
        >
      </i>
    </a>
    );
};
export default ToggleDirection;
