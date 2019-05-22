import React, { Component }from 'react';
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import NavBarStyles from '../styles/NavBar.js'

class NavBar extends Component {

  render() {
    const { classes, getLoginCallback } = this.props;

    let loggedIn = getLoginCallback()
    let url = loggedIn ? "/logout" : "/login"
    let text = loggedIn ? "Logout" : "Login"
    let authButton = 
        <Button component={Link} to={url} color="primary" variant="outlined">
          {text}
        </Button>

    return (
      <div>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            SYL NavBar
          </Typography>
          <Button href="/">Home</Button>
          {loggedIn ? <Button component={Link} to="/dashboard">Dashboard</Button> : null }
          {authButton}
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}
export default withStyles(NavBarStyles)(NavBar);



