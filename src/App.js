import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components'

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//Components
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Map from './containers/Map/Map'
//States
import AlertState from './context/alert/alertState';
import AuthState from './context/authentication/authState';
import tokenAuth from './config/tokenAuth';

//checking if a token is available
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}
 
class App extends React.Component {


  render() {
    return (
      <div className="App">
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Map} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </div>
    );
  }
}
export default App;
