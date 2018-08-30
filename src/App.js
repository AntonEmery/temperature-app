import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LocationForm from './components/LocationForm';
import CurrentTemp from './components/CurrentTemp';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        displayData: false,
        loading: false,
        temp_c: '',
        temp_f: ''
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
    })
  }

  render() {
    const {temp_c, temp_f } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LocationForm submitLocation={this.submitLocation} />
        {!this.state.displayData && this.state.loading && <p>Loading</p>}
        {this.state.displayData && <CurrentTemp temp_c={temp_c} temp_f={temp_f} />}
      </div>
    );
  }
}

export default App;
