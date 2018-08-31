import React from 'react';
import PropTypes from 'prop-types';
import CurrentTemp from './CurrentTemp';
import MeanTemp from  './MeanTemp';
import AggregrateTemps from './AggregateTemps';

function DataWrapper({ maxTemp, minTemp, currentTemp, units, toggleTemp, tempHistory }) {

    return (
      <div>
        <h3>Current Temperature Data in {units}</h3>

        <CurrentTemp currentTemp={currentTemp} />
        <MeanTemp maxTemp={maxTemp} minTemp={minTemp} />
        <button onClick={toggleTemp}>Toggle Celsius or Farenheit</button>
        <AggregrateTemps tempHistory={tempHistory} units={units}/>
      </div>
    )
}

export default DataWrapper;