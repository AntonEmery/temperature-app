import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { BarChart } from 'react-easy-chart';



class MeanTemp extends Component {
  state = {  };

  render() {

    const { maxtemp_c, mintemp_c } = this.props;
    return (
      <div>
        <p>Mean Temp</p>
        <BarChart
          axes
          colorBars
          width={250}
          data={[
            {x: 'Max', y: maxtemp_c},
            {x: 'Min', y: mintemp_c}
          ]}

        />
      </div>
    );
  }
}

export default MeanTemp;