import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart } from 'react-easy-chart';


class AggregrateTemps extends Component {
  state = {  };

  render() {
    const { tempHistory } = this.props;
    return (
     tempHistory.length > 0 && <BarChart
          axes
          colorBars
          width={450}
          height={400}
          data={[
            {x: tempHistory[0].date, y: tempHistory[0].tempC},
            {x: tempHistory[1].date, y: tempHistory[1].tempC},
            {x: tempHistory[2].date, y: tempHistory[2].tempC},
            {x: tempHistory[3].date, y: tempHistory[3].tempC},
            {x: tempHistory[4].date, y: tempHistory[4].tempC},
            {x: tempHistory[5].date, y: tempHistory[5].tempC}
          ]}
        />
    );
  }
}

export default AggregrateTemps;