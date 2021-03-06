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
      // add array of prev six dates to state
      this.setState({ history: days });
    }
  }

  setWeek = () => {
    // get number of previous days in the current week starting from today
    let week = parseInt(moment().startOf('week').fromNow()[0], 10);
    let weeklyDates = [];
    // need to limit i to less than 6 as the api will not return data farther back than 6 days
    for(let i=0; i < week && i < 6; i++) {
      // push that many days from tempHistory state into the weeklyDates array.
      // that gives us the temp data for the current week
      weeklyDates.push(this.state.tempHistory[i])
    }
    this.setState({ weeklyTemps: weeklyDates })
  }

  toggleTemp = () => {
    // if current state is Celsius and user toggles it switch to F and assign appropriate temps
    if(this.state.units === 'Celsius') {
      this.setState({
        currentTemp: this.state.tempF,
        maxTemp: this.state.maxTempF,
        minTemp: this.state.minTempF,
        units: 'Fahrenheit'
      })
    } else {
      // else switch it back to C
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
    // get current temps
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
      const day = result.forecast.forecastday[0].day;
      // set max/min temps in both units for the current day to state
      this.setState({
        maxTempC: day.maxtemp_c,
        minTempC: day.mintemp_c,
        maxTempF: day.maxtemp_f,
        minTempF: day.mintemp_f,
        // set initial max/min temp to F
        maxTemp: day.maxtemp_f,
        minTemp: day.mintemp_f
      })
    })
    // get previous weather for past six days
    let dates = this.state.history.map(date => {
      return fetch(`http://api.apixu.com/v1/history.json?key=06afaabe82054526aca231633182908&q=${location}&dt=${date}`)
      .then(data => {
        return data.json();
      })
    })
    Promise.all(dates)
    .then(dates => {
      let tempHistory = dates.map(date => {
        let forecast = date.forecast.forecastday[0];
        return {
          date: forecast.date,
          tempC: forecast.day.avgtemp_c,
          tempF: forecast.day.avgtemp_f,
          temp: forecast.day.avgtemp_f,
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
