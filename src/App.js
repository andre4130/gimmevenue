import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//Components
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Map from './containers/Map/Map'

class App extends React.Component {

  render() {
    return (

      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Map}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>       
        </Router>
      </div>
    );
  }
}
export default App;
