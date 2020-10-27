import React from 'react';

export default function Message (props) {

  const message = props.message;

  return (

      <div className="media-body">
        <h4 className="media-heading">{ message.user.username }</h4>
        { message.content }
      </div>

  );
}
