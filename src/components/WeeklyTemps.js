import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';


class WeeklyTemps extends Component {
  state = {  };

  render() {

    const { weeklyTemps } = this.props;
    console.log(weeklyTemps.reduce((a, b) => a + b.temp, 0)/weeklyTemps.length)


    return (
      // wait until array populated to render graph
     <BarChart
          axes
          colorBars
          width={450}
          height={400}
          data={[

          ]}
        />
    );
  }
}

export default WeeklyTemps;