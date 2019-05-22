import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar.js';
import Dashboard from './components/Dashboard.js';
import Login from './components/Login';
import Logout from './components/Logout';
import { isAuthenticated } from './components/AuthService.js';

class App extends Component {
  constructor(props) {
    super(props);
    // bind callbacks for setting auth status
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.getLoggedIn = this.getLoggedIn.bind(this);
    // global state, which may be propgated to children
    this.state = {
      loggedIn: isAuthenticated()
    }
  }

  setLoggedIn(state) {
    this.setState({loggedIn: state })
  }

  getLoggedIn() {
    return this.state.loggedIn
  }

  render() {
    return (
      <Router>
        <NavBar getLoginCallback={this.getLoggedIn} />
        {this.getLoggedIn() ? <Route path="/dashboard" component={Dashboard} /> : null}
        <Route path="/login" render={() => <Login setLoginCallback={this.setLoggedIn} 
                                                  getLoginCallback={this.getLoggedIn}></Login>} />
        <Route path="/logout" render={() => <Logout setLoginCallback={this.setLoggedIn}></Logout>} />
      </Router>
    )
  }
}

export default App;
