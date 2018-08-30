import React from 'react';

function CurrentTemp({temp_c, temp_f}) {
  return (
    <div>
      <h3>Current Temperature</h3>
      <p>Fahrenheit: {temp_f}</p>
      <p>Celsius: {temp_c}</p>
    </div>
  )
}

export default CurrentTemp;