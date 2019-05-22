import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import NavBarStyles from '../styles/NavBar.js'
import { injectLogo } from './SVGInjectors'

class NavBar extends Component {

  render() {
    const { classes, getLoginCallback } = this.props;

    let authButton
    // change loging/logout button depending on auth state
    if (!getLoginCallback()) {
      authButton = 
        <Button component={Link} to="/login" color="primary" variant="outlined">
          Login
        </Button>
    } else {
      authButton = 
        <Button component={Link} to="/logout" color="primary" variant="outlined">
          Logout
        </Button>
    }

    return (
      <div>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <span className={classes.logo}>
            {injectLogo()}
          </span>
          <div className={classes.grow} />
          <Button href="/">Home</Button>
          {getLoginCallback() ? <Button component={Link} to="/dashboard">Dashboard</Button> : null }
          {authButton}
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}
export default withStyles(NavBarStyles)(NavBar);



