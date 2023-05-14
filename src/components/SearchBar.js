import React, { useState } from 'react';

function TextInput(props) {
  var text = "";
  const {handleChange} = props;
  text = props.text;

  return (
    <input type="text" value={text} onChange={handleChange} />
  );
}

export default TextInput;