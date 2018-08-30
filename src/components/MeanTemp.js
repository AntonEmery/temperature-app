import React, { Component }from 'react';
import PropTypes from 'prop-types';

class MeanTemp extends Component {
  state = {  };

  render() {
    return (
      <div>
        <p>Mean Temp</p>
        <p>{this.props.maxtemp_c}</p>
        <p>{this.props.mintemp_c}</p>
      </div>
    );
  }
}

export default MeanTemp;