import React from 'react';

const Status = (props) => {
  return(
    <div id={props.id} className={"text-" + props.color}>{props.message}</div>
    );
};

export default Status;