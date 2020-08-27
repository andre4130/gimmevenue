import React, {useEffect, useContext, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
//Components
import BarcelonaMapGl from '../../containers/Map/BarcelonaMapGl';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';


//data
import tokens from "../../data/token.json";

//authentication for the users of the map
import AuthContext from '../../context/authentication/authContext';

function App({city}) {

  //setting the state of the App
  const authContext = useContext(AuthContext)
  const { authUser } = authContext;
  
  useEffect(() => {
    authUser();
  },[]);
  
  const [stateCity, setCityState] = useState({
      selectedCity: 'Barcelona',
      latitude: 41.386991,
      longitude: 2.169987,
  })
  
  const [token, setToken] = useState({
      token: tokens
  })
  
  let year = new Date().getFullYear();
  
  const handleSelectCity = (city) => {
      setCityState({
          selectedCity: city[0].id,
          latitude: city[0].coordinates[0],
          longitude: city[0].coordinates[1]
      })
  }
  return (
  
      <div className="App">
        <Header></Header>
        <BarcelonaMapGl
          mapboxApiAccessToken={token}
          selectedCity={stateCity.selectedCity}
          latitude={stateCity.latitude}
          longitude={stateCity.longitude}
          handleSelectCity={handleSelectCity}
        >
        </BarcelonaMapGl>
        <Footer year={year} />
      </div>
    );
  }
  
  export default App;

//IMPORTANT --> BELOW YOU CAN FIND THE CODE USING CLASS INSTEAD OF HOOKS

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedCity: 'Barcelona',
//       latitude: 41.386991,
//       longitude: 2.169987,
//     };
//     this.token = {
//       token: tokens
//     }
//     this.year = new Date().getFullYear()
//   }

//   handleSelectCity = (city) => {
//     this.setState({
//       selectedCity: city[0].id,
//       latitude: city[0].coordinates[0],
//       longitude: city[0].coordinates[1]
//     })
//   };


//   render() {

//     return (

//       <div className="App">
//         <BarcelonaMapGl
//           mapboxApiAccessToken={this.token}
//           selectedCity={this.state.selectedCity}
//           latitude={this.state.latitude}
//           longitude={this.state.longitude}
//           handleSelectCity={this.handleSelectCity}
//         >

//         </BarcelonaMapGl>
//         <Navbar handleSelectCity={this.handleSelectCity}></Navbar>
//         <Footer year={this.year} />
//       </div>
//     );
//   }
// }
// export default App;
