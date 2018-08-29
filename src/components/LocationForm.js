import React, { Component } from 'react';


class LocationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: ''
    }
  }

  handleChange = (e) => {
    this.setState({ location: e.target.value })
  }

  handleSubmit = () => {
    console.log('form submitted');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="location">Location
        <input
          type="text"
          name="location"
          value={this.state.location}
          onChange={this.handleChange}
        />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default LocationForm