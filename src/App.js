import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LocationForm from './components/LocationForm';
import DataWrapper from './components/DataWrapper';
import moment from 'moment';

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
        units: 'Fahrenheit',
        tempHistory: [
          {tempC: 10, tempF: 30, date: '2018-08-23' },
          {tempC: 4, tempF: 30, date: '2018-08-21' },
          {tempC: 1, tempF: 30, date: '2018-08-22' },
          {tempC: 6, tempF: 30, date: '2018-08-16' },
          {tempC: 15, tempF: 30, date: '2018-08-13' },
          {tempC: 35, tempF: 30, date: '2018-08-10' },
          {tempC: 20, tempF: 30, date: '2018-08-18' }
        ]
      }
  }

  componentDidMount() {
    let days = []
    for(var i=1; i<8; i++) {
      let today = moment();
      today = today.subtract(i, 'days').format('YYYY-MM-DD');
      days.push(today);
      console.log(days)
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
    this.setState((prevState, props) => ({ loading: true }))

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

  }

  render() {
    const { maxTemp, minTemp, currentTemp, units, tempHistory } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Temperature Data</h1>
        </header>
        <LocationForm submitLocation={this.submitLocation} />
        {!this.state.displayData && this.state.loading && <p>Loading</p>}
        {this.state.displayData && <DataWrapper currentTemp={currentTemp} maxTemp={maxTemp} minTemp={minTemp} toggleTemp={this.toggleTemp} units={units} tempHistory={tempHistory} />}
      </div>
    );
  }
}

export default App;
