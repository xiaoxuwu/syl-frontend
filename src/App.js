import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound'
import Login from './components/Login';
import Logout from './components/Logout';
import { isAuthenticated } from './components/AuthService';

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
        <Switch>
        <Route exact path="/" component={Home} />
        {this.getLoggedIn() ? <Route path="/dashboard" component={Dashboard} /> : null}
        <Route exact path="/login" render={() => <Login setLoginCallback={this.setLoggedIn} 
                                                  getLoginCallback={this.getLoggedIn}></Login>} />
        <Route exact path="/logout" render={() => <Logout setLoginCallback={this.setLoggedIn}></Logout>} />
        <Route path="" component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App;
