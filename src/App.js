import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LocationForm from './components/LocationForm';

class App extends Component {

  submitLocation = (location) => {
    this.setState({ loading: true }, () => {
      fetch(`http://api.apixu.com/v1/current.json?key=06afaabe82054526aca231633182908&q=${location}`)
      .then(data => {
        return data.json();
      }).then(result => {
          console.log(result)
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LocationForm submitLocation={this.submitLocation}/>
      </div>
    );
  }
}

export default App;
