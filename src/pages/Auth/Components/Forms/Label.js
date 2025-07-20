import React from "react";

const Label = (props) => {
  return(
    <div class="row py-1">
      <div class="col-12 text-center">
        <label id={props.id} class="text-danger">{props.message}</label>
      </div>
    </div>
    );
};

export default Label