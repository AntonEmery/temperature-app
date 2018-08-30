import React, { Component } from 'react';


class CurrentTemp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      celsius: true
    }
  }

  render() {
    const { temp_f, temp_c } = this.props;
    return (
      <div>
        <h3>Current Temperature</h3>
        {this.state.celsius
        ? <p>Celsius: {temp_c}</p>
        : <p>Fahrenheit: {temp_f}</p>}
        <button onClick={() => this.setState(prevState => ({celsius: !prevState.celsius})) }>Choose Celsius or Farenheit</button>
      </div>
    )
  }
}

export default CurrentTemp;