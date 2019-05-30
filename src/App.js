import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound'
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import { isAuthenticated } from './components/auth/AuthService';
import Links from './components/Links.js';
import CreateAccount from './components/CreateAccount';
<<<<<<< HEAD
<<<<<<< HEAD
import { loadCSS } from 'fg-loadcss';
=======
>>>>>>> Instagram redirect stuff
=======
import { loadCSS } from 'fg-loadcss';
>>>>>>> Move loadCss to App.js

class App extends Component {
  constructor(props) {
    super(props);
    loadCSS('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
    loadCSS('https://fonts.googleapis.com/css?family=Oxygen');
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
        <Route path="/influencer/*" render={() => <NavBar getLoginCallback={this.getLoggedIn} />} />
        <Switch>
          <Route exact path="/influencer/" component={Home} />
          {this.getLoggedIn() ? <Route exact path="/influencer/dashboard/" component={Dashboard} /> : null}
          <Route exact path="/influencer/login" render={(props) => <Login {...props} setLoginCallback={this.setLoggedIn}
                                                    getLoginCallback={this.getLoggedIn}></Login>} />
          <Route exact path="/influencer/logout" render={() => <Logout setLoginCallback={this.setLoggedIn}></Logout>} />
          <Route exact path="/links/:username" component={Links} />
          <Route exact path="/influencer/create_account" render={(props) => <CreateAccount {...props} setLoginCallback={this.setLoggedIn}
                                                    getLoginCallback={this.getLoggedIn}
                                                    ></CreateAccount>} />
          <NotFound default />
        </Switch>
      </Router>
    )
  }
}

export default App;
