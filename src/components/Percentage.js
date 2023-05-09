import React, { useEffect, useState } from 'react';

export default function Percentage(props) {
  const [text, setText] = useState('0% Complete');

  useEffect(() => {
    setText(props.percentage.toString() + '%  complete')
  }, [props])

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}