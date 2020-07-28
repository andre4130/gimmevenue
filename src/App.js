import React from 'react';

//Styles
import './App.css';
//Components
import BarcelonaMapGl from './containers/Map/BarcelonaMapGl';
import Navbar from "./components/Navbar"
import Footer from './components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import CitySelection from './components/CitySelection/CitySelection';
import FilterBox from './components/FilterBox/FilterBox';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCity: 'Barcelona',
      latitude: 41.386991,
      longitude: 2.169987,
    };
    this.year = new Date().getFullYear()
  }


  handleSelectCity = (city) => {
    this.setState({
      selectedCity: city[0].id,
      latitude: city[0].coordinates[0],
      longitude: city[0].coordinates[1]
    })
    console.log('city in App.js', city)
  };

  render(){
    return (   
      <div className="App">
        <BarcelonaMapGl
                  mapboxApiAccessToken={"pk.eyJ1IjoiYW5kcmU0MTMwIiwiYSI6ImNrY25qMjVhZDBicnUycmxobTZwdDRlYzMifQ.4OTMiqEr3gZDmRZJY-ByHA"} 
                  selectedCity={this.state.selectedCity} 
                  latitude={this.state.latitude} 
                  longitude={this.state.longitude}
                  handleSelectCity={this.handleSelectCity}
        >
        </BarcelonaMapGl>
        <Navbar handleSelectCity={this.handleSelectCity}></Navbar>
        <Footer year={this.year}/>
      </div>
    );
  }
}
export default App;
