import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart } from 'react-easy-chart';


class AggregrateTemps extends Component {
  state = {  };

  render() {
    const { tempHistory, units } = this.props;
    tempHistory.forEach(item => {
      if(units === 'Celsius') {
        item.temp = item.tempC;
      } else {
        item.temp = item.tempF
      }
      });

    return (
     tempHistory.length > 0 && <BarChart
          axes
          colorBars
          width={450}
          height={400}
          data={[
            {x: tempHistory[0].date, y: tempHistory[0].temp},
            {x: tempHistory[1].date, y: tempHistory[1].temp},
            {x: tempHistory[2].date, y: tempHistory[2].temp},
            {x: tempHistory[3].date, y: tempHistory[3].temp},
            {x: tempHistory[4].date, y: tempHistory[4].temp},
            {x: tempHistory[5].date, y: tempHistory[5].temp}
          ]}
        />
    );
  }
}

export default AggregrateTemps;