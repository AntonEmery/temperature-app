import React, { Component } from 'react';
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
        tempHistory: [],
        weeklyTemps: []
      }
  }

  componentDidMount() {
    // use moment.js to calculate the previous 6 dates
    let days = []
    for(let i=1; i<7; i++) {
      let today = moment();
      today = today.subtract(i, 'days').format('YYYY-MM-DD');
      days.push(today);
      this.setState({ history: days });
    }
  }

  setWeek = () => {
    // get number of days in the current week starting from today
    let week = parseInt(moment().startOf('week').fromNow()[0], 10);
    let weeklyDates = [];
    for(let i=0; i<week; i++) {
      // push that many days from tempHistory into the weeklyDates array.
      // that gives us the temp data for the current week
      weeklyDates.push(this.state.tempHistory[i])
    }
    this.setState({ weeklyTemps: weeklyDates })
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
    // set loading to true so loader is displayed
    this.setState((prevState, props) => ({ loading: true, units: 'Fahrenheit' }))
    // get current weather
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
    // get max/min temps for the current day
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
    // get previous weather for past six days
    let dates = this.state.history.map(item => {
      return fetch(`http://api.apixu.com/v1/history.json?key=06afaabe82054526aca231633182908&q=${location}&dt=${item}`)
      .then(data => {
        return data.json();
      })
    })
    Promise.all(dates)
    .then(dates => {
      let tempHistory = dates.map(date => {
        return {
          date: date.forecast.forecastday[0].date,
          tempC: date.forecast.forecastday[0].day.avgtemp_c,
          tempF: date.forecast.forecastday[0].day.avgtemp_f,
          temp: date.forecast.forecastday[0].day.avgtemp_f,
        }
      })
      // after the weather history is assigned to state, get the required days from that history for the weekly data
      this.setState({ tempHistory }, () => this.setWeek())
    })
  }

  render() {
    const { maxTemp, minTemp, currentTemp, units, tempHistory, weeklyTemps } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Temperature Data Around the World</h1>
        </header>
        <LocationForm submitLocation={this.submitLocation} />
        {/* Display loading during API request */}
        {!this.state.displayData && this.state.loading && <p>Loading</p>}
        {/* Display the rest of the data once request returns */}
        {this.state.displayData && <DataWrapper currentTemp={currentTemp} maxTemp={maxTemp} minTemp={minTemp} toggleTemp={this.toggleTemp} units={units} tempHistory={tempHistory} weeklyTemps={weeklyTemps} />}
      </div>
    );
  }
}

export default App;
