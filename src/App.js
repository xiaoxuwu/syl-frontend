import React, { Component } from 'react';
import { Redirect, Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// Theme
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';

import NavBar from './components/NavBar';
import Home from './components/Home'
import Edit from './components/Edit';
import Preview from './components/Preview'
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import { isAuthenticated } from './components/auth/AuthService';
import Links from './components/Links.js';
import CreateAccount from './components/CreateAccount';
import { loadCSS } from 'fg-loadcss';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Dashboard from './views/Dashboard';
import LinkList from './views/LinkList';
import NotFound from './views/NotFound';

// Browser history
const browserHistory = createBrowserHistory();

export default class App extends Component {
  constructor(props) {
    super(props);
    loadCSS('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
    loadCSS('https://fonts.googleapis.com/css?family=Oxygen');
    // bind callbacks for setting auth status
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.getLoggedIn = this.getLoggedIn.bind(this);
    // global state, which may be propgated to children
    this.state = {
      loggedIn: isAuthenticated(),
      isOpen: true,
    }
  }

  setLoggedIn(state) {
    this.setState({loggedIn: state })
  }

  getLoggedIn() {
    return this.state.loggedIn
  }

  toggleSidebar = (isOpen) => {
    // console.log('toggleSidebar: ', isOpen)
    this.setState({
      isOpen: isOpen,
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <DragDropContextProvider backend={HTML5Backend}>
        <Router history={browserHistory}>
          <Route exact strict path="/:url*" render={props => <Redirect to={`${props.location.pathname}/`}/>} />
          <Route path="/influencer/*" render={ props => 
            <NavBar 
              getLoginCallback={this.getLoggedIn} 
              isDashboard={props.location.pathname === '/influencer/dashboard/' || props.location.pathname === '/influencer/dashboard/links/'} 
              isOpen={this.state.isOpen}
              onChange={this.toggleSidebar} 
            />} />
          <Switch>
            <Redirect exact from="/" to="/influencer" />
            <Route exact path="/influencer" component={Home} />
            <Route exact path="/influencer/preview" component={Preview} />
            <Route
              render={props => <Dashboard isOpen={this.state.isOpen} onChange={this.toggleSidebar} />}
              exact path="/influencer/dashboard"
            />
            {this.getLoggedIn() ? <Route exact path="/influencer/edit" component={Edit} /> : null}
            <Route
              render={props => <LinkList isOpen={this.state.isOpen} onChange={this.toggleSidebar} />}
              exact path="/influencer/dashboard/links/"
            />
            <Route exact path="/influencer/login" render={(props) => <Login {...props} setLoginCallback={this.setLoggedIn}
                                                      getLoginCallback={this.getLoggedIn}></Login>} />
            <Route exact path="/influencer/logout" render={() => <Logout setLoginCallback={this.setLoggedIn}></Logout>} />
            <Route exact path="/links/:username" component={Links} />
            <Route exact path="/influencer/create_account" render={(props) => <CreateAccount {...props} setLoginCallback={this.setLoggedIn}
                                                      getLoginCallback={this.getLoggedIn}
                                                      ></CreateAccount>} />
            <Route
              component={NotFound}
              exact path="/not-found"
            />
            <Redirect to="/not-found" />
          </Switch>
        </Router>
        </DragDropContextProvider>
      </ThemeProvider>
    );
  }
}
