import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { BarChart } from 'react-easy-chart';



class MeanTemp extends Component {
  state = {  };

  render() {

    const { maxTemp, minTemp } = this.props;
    return (
      <div>
        <p>Max and Min Temp</p>
        <BarChart
          axes
          colorBars
          width={250}
          height={400}
          data={[
            {x: 'Max', y: maxTemp},
            {x: 'Min', y: minTemp}
          ]}
        />
      </div>
    );
  }
}

export default MeanTemp;