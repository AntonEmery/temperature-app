import React from 'react';
import PropTypes from 'prop-types';
import CurrentTemp from './CurrentTemp';
import MeanTemp from  './MeanTemp';

function DataWrapper({ maxTemp, minTemp, currentTemp, units, toggleTemp }) {

    return (
      <div>
        <h3>Current Temperature Data in {units}</h3>

        <CurrentTemp currentTemp={currentTemp} />
        <MeanTemp maxTemp={maxTemp} minTemp={minTemp} />
        <button onClick={toggleTemp}>Choose Celsius or Farenheit</button>
      </div>
    )
}

export default DataWrapper;