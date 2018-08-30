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
        tempC: '',
        tempF: '',
        maxTempC: '',
        minTempC: '',
        maxTempF: '',
        minTempF: '',
        currentTemp: '',
        maxTemp: '',
        minTemp: '',
        units: 'Fahrenheit'
      }
  }

  toggleTemp = () => {
    if(this.state.units === 'Celsius') {
      this.setState({
        currentTemp: this.state.tempF,
        maxTemp: this.state.maxTempF,
        minTemp: this.state.minTempF,
        units: 'Fahrenheit'
      })
    } else {
      this.setState({
        currentTemp: this.state.tempC,
        maxTemp: this.state.maxTempC,
        minTemp: this.state.minTempC,
        units: 'Celsius'
      })
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
            tempC: result.current.temp_c,
            tempF: result.current.temp_f,
            currentTemp: result.current.temp_f,
          })
      })

      fetch(`http://api.apixu.com/v1/forecast.json?key=06afaabe82054526aca231633182908&q=${location}`)
      .then(data => {
        return data.json();
      }).then(result => {
        this.setState({
          maxTempC: result.forecast.forecastday[0].day.maxtemp_c,
          minTempC: result.forecast.forecastday[0].day.mintemp_c,
          maxTempF: result.forecast.forecastday[0].day.maxtemp_f,
          minTempF: result.forecast.forecastday[0].day.mintemp_f,
          maxTemp: result.forecast.forecastday[0].day.maxtemp_f,
          minTemp: result.forecast.forecastday[0].day.mintemp_f
        })
      })
    })
  }

  render() {
    const { maxTemp, minTemp, currentTemp, units } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Temperature Data</h1>
        </header>
        <LocationForm submitLocation={this.submitLocation} />
        {!this.state.displayData && this.state.loading && <p>Loading</p>}
        {this.state.displayData && <DataWrapper currentTemp={currentTemp} maxTemp={maxTemp} minTemp={minTemp} toggleTemp={this.toggleTemp} units={units} />}
      </div>
    );
  }
}

export default App;
