import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LocationForm from './components/LocationForm';
import DataWrapper from './components/DataWrapper';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        displayData: false,
        loading: false,
        temp_c: '',
        temp_f: '',
        maxtemp_c: '',
        mintemp_c: ''
      }
  }

  submitLocation = (location) => {
    this.setState({ loading: true }, () => {
      fetch(`http://api.apixu.com/v1/current.json?key=06afaabe82054526aca231633182908&q=${location}`)
      .then(data => {
        return data.json();
      }).then(result => {
          this.setState({
            displayData: true,
            temp_c: result.current.temp_c,
            temp_f: result.current.temp_f,
          })
      })

      fetch(`http://api.apixu.com/v1/forecast.json?key=06afaabe82054526aca231633182908&q=${location}`)
      .then(data => {
        return data.json();
      }).then(result => {
        console.log(result.forecast.forecastday[0].day)
        this.setState({
          maxtemp_c: result.forecast.forecastday[0].day.maxtemp_c,
          mintemp_c: result.forecast.forecastday[0].day.mintemp_c
        })
      })
    })
  }

  render() {
    const {temp_c, temp_f, maxtemp_c, mintemp_c } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Temperature Data</h1>
        </header>
        <LocationForm submitLocation={this.submitLocation} />
        {!this.state.displayData && this.state.loading && <p>Loading</p>}
        {this.state.displayData && <DataWrapper temp_c={temp_c} temp_f={temp_f} maxtemp_c={maxtemp_c} mintemp_c={mintemp_c}/>}
      </div>
    );
  }
}

export default App;
