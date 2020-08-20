import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
//Components
import BarcelonaMapGl from '../../containers/Map/BarcelonaMapGl';
import Navbar from "../../components/Navbar";
import Footer from '../../components/Footer/Footer';


//data
import tokens from "../../data/token.json"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: 'Barcelona',
      latitude: 41.386991,
      longitude: 2.169987,
    };
    this.token = {
      token: tokens
    }
    this.year = new Date().getFullYear()
  }

  handleSelectCity = (city) => {
    this.setState({
      selectedCity: city[0].id,
      latitude: city[0].coordinates[0],
      longitude: city[0].coordinates[1]
    })
    console.log('city in App.js', city)
    console.log('getting token', this.token)
  };

  render() {
    return (

      <div className="App">
        <BarcelonaMapGl
          mapboxApiAccessToken={this.token}
          selectedCity={this.state.selectedCity}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          handleSelectCity={this.handleSelectCity}
        >

        </BarcelonaMapGl>
        <Navbar handleSelectCity={this.handleSelectCity}></Navbar>
        <Footer year={this.year} />
      </div>
    );
  }
}
export default App;
