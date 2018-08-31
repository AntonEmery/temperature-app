import React, { Component } from 'react';


class WeeklyTemps extends Component {

  render() {
    const { weeklyTemps } = this.props;
    const avgWeeklyTemp = weeklyTemps.reduce((a, b) => a + b.temp, 0) / weeklyTemps.length;
    return (
      <div>
        <p>Average Weekly Temperature</p>
        <p>{ avgWeeklyTemp.toFixed() } degrees</p>
      </div>
    );
  }
}

export default WeeklyTemps;