import React, { Component } from 'react';
import CurrentTemp from './CurrentTemp';
import MeanTemp from  './MeanTemp';
import AggregrateTemps from './AggregateTemps';
import WeeklyTemps from './WeeklyTemps';

class DataWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: 'daily'
    }
  }
  render() {
    const { maxTemp, minTemp, currentTemp, units, toggleTemp, tempHistory, weeklyTemps } = this.props;
    return (
      <div>
        <h3>Current Temperature Data in {units}</h3>
        <button className="btn" onClick={toggleTemp}>Toggle Celsius or Farenheit</button>
        <CurrentTemp currentTemp={currentTemp} />
        <MeanTemp maxTemp={maxTemp} minTemp={minTemp} />
        <button className="btn change-view" onClick={() => this.setState({ view: 'daily' })}>View Daily</button>
        <button className="btn change-view" onClick={() => this.setState({ view: 'weekly' })}>View Weekly</button>
        <button className="btn change-view" onClick={toggleTemp}>View Monthly</button>

        {this.state.view === 'daily' && <AggregrateTemps tempHistory={tempHistory} units={units}/>}
        {this.state.view === 'weekly' && <WeeklyTemps weeklyTemps={weeklyTemps} />}
      </div>
    )
  }
}

export default DataWrapper;