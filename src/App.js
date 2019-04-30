import React, { Component } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/Layout/Landing';
import Register from './UserManagement/Register';
import Login from './UserManagement/Login';
import jwt_decode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
import NetworkOverviewTabs from './components/Layout/NetworkOverviewTabs';

const jwtToken = localStorage.jwtToken;
const styles = {
  fontFamily: 'sans-serif'
};

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/';
  }
}

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { active: 'fbTab' };
  // }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={styles}>
            <div className="App">
              <Header />
              {
                //Public Routes
              }

              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/networks" component={NetworkOverviewTabs} />

              {
                //Private Routes
              }
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
