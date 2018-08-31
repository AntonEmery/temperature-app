import React, { Component } from 'react';


class WeeklyTemps extends Component {

  render() {
    const { weeklyTemps, units } = this.props;
    let temp = units === 'Celsius' ? 'tempC' : 'tempF';
    const avgWeeklyTemp = weeklyTemps.reduce((a, b) => a + b[temp], 0) / weeklyTemps.length;
    return (
      !isNaN(avgWeeklyTemp) &&
      <div>
        <p>Average Weekly Temperature</p>
        <p>{ avgWeeklyTemp.toFixed() } degrees</p>
      </div>
    );
  }
}

export default WeeklyTemps;