import React from 'react';
import CurrentTemp from './CurrentTemp';
import MeanTemp from  './MeanTemp';
import AggregrateTemps from './AggregateTemps';
import WeeklyTemps from './WeeklyTemps';

function DataWrapper({ maxTemp, minTemp, currentTemp, units, toggleTemp, tempHistory, weeklyTemps }) {

    return (
      <div>
        <h3>Current Temperature Data in {units}</h3>
        <button className="btn" onClick={toggleTemp}>Toggle Celsius or Farenheit</button>
        <CurrentTemp currentTemp={currentTemp} />
        <MeanTemp maxTemp={maxTemp} minTemp={minTemp} />
        <AggregrateTemps tempHistory={tempHistory} units={units}/>
        <WeeklyTemps weeklyTemps={weeklyTemps} />
      </div>
    )
}

export default DataWrapper;