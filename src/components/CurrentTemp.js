import React, { Component } from 'react';


class CurrentTemp extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { currentTemp } = this.props;
    return (
      <div>
        <p>{currentTemp} degrees</p>
      </div>
    )
  }
}

export default CurrentTemp;