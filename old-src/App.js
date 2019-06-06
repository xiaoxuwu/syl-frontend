import React, { Component } from 'react'
import { Redirect, Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import NotFound from './components/NotFound'
import Preview from './components/Preview'
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import { isAuthenticated } from './components/auth/AuthService';
import Links from './components/Links.js';
import CreateAccount from './components/CreateAccount';
import { loadCSS } from 'fg-loadcss';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// Theme
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';

// Views
import Dashboard from './components/dashboard/views/Dashboard';
import UserList from './components/dashboard/views/UserList';
// import NotFound from './components/dashboard/views/NotFound';

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
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact strict path="/:url*" render={props => <Redirect to={`${props.location.pathname}/`}/>} />
          <Route path="/influencer/*" render={() => <NavBar getLoginCallback={this.getLoggedIn} />} />
          <Switch>
            <Redirect exact from="/" to="/influencer" />
            <Route exact path="/influencer" component={Home} />
            <Route exact path="/influencer/preview" component={Preview} />
            <Route
              component={Dashboard}
              exact
              path="/influencer/dashboard"
            />
            <Route
              component={UserList}
              exact
              path="/influencer/dashboard/users"
            />
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
      </ThemeProvider>
    )
  }
}

export default App;
