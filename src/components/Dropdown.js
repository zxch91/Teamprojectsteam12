import React, { useEffect, useState } from 'react';

export default function DropdownMenu(props) {

const {options, onOptionSelect} = props;

  return (
    <div>
      <select id="dropdown" onChange={onOptionSelect}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.label} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}